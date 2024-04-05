import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, atom } from 'recoil';

export const relatedDataUrlState = atom({
  key: 'relatedDataUrlState',
  default:
    'https://script.googleusercontent.com/macros/echo?user_content_key=eZc5ZI_5uIjKgfMjH2_SPPMYv8cxFBIkWPUr_9ikfkgxhj6xeHMxsbhhkkxdnrGqqkBp81s-CMyKcTthGOMyNSb9b-CHg-7sm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNn7QRqOoEBV3cKWTQSamdgSRZrrPeIyZwphpZ0GlGts72gFKSD-1bAtb3NGIwK2-kjPHDGPMaez-XMAlwbU29ealZQvKNBeidz9Jw9Md8uu&lib=MlymDeyPZhGLLMUX4XnL84AHWkD4xvv7U',
});

export const graphDataState = atom({
  key: 'graphDataState',
  default: [],
});

export function InputData() {
  const relatedDataUrl = useRecoilValue(relatedDataUrlState);
  const [graphData, setGraphData] = useRecoilState(graphDataState);
  const list = [
    'US_input',
    'CS_input',
    'LaV',
    'LaD',
    'INAdm',
    'INAvm',
    'BA_F',
    'BA_E',
    'CA1',
    'output',
  ];

  console.log(graphData);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(relatedDataUrl);
      if (res.status == 200) {
        const text = await res.json();
        text[0].shift();
        const edges = text[0]
          //.filter((e) => list.includes(e[0]) && list.includes(e[1]))
          .map((e) => {
            return {
              group: 'edges',
              data: {
                id: e[0] + '-' + e[1],
                source: e[0],
                target: e[1],
              },
            };
          })
          .filter((e) => !(e.data.source == '' || e.data.target == ''));
        const [baseData, copyData] = getNodesFromLinks(edges);
        console.log('basedata', baseData);
        console.log('copydata', copyData);

        const [sl, sr] = greedyCycleRemoval(copyData);

        // const removeNodesId = removeCycles(copyData);
        // console.log('removeNodes : ', removeNodesId);

        // const changeData = baseData.map((e) => {
        //   const removed = removeNodesId.includes(e.data.id);
        //   return {
        //     group: 'nodes',
        //     classes: [removed ? 'removed' : ''],
        //     data: {
        //       id: e.data.id,
        //       label: e.data.id,
        //       source: removed ? e.data.target : e.data.source,
        //       target: removed ? e.data.source : e.data.target,
        //       removed: removed,
        //     },
        //   };
        // });
        // console.log(
        //   'changeData',
        //   changeData.map((e) => e.data.id),
        // );
        const addHierarchyData = addHierarchy(baseData);
        console.log(baseData);
        console.log(addHierarchyData);

        const changeEdges = edges.map((e) => {
          const removed =
            sr.includes(e.data.source) && sl.includes(e.data.target);
          if (removed) {
            console.log('change', e.data.id);
          }
          return {
            group: 'edges',
            classes: [removed ? 'removedEdge' : ''],
            data: {
              id: e.data.id,
              source: removed ? e.data.target : e.data.source,
              target: removed ? e.data.source : e.data.target,
            },
          };
        });
        setGraphData(addHierarchyData.concat(changeEdges));
      }
    };
    fetchData();
  }, [relatedDataUrl]);

  return <></>;
}

function getNodesFromLinks(links) {
  let nodes = {};

  links.forEach((link) => {
    if (!nodes[link.data.source]) {
      nodes[link.data.source] = createNode(link.data.source);
    }
    if (!nodes[link.data.target]) {
      nodes[link.data.target] = createNode(link.data.target);
    }
  });

  links.forEach((link) => {
    nodes[link.data.source].data.target.push(nodes[link.data.target]);
    nodes[link.data.target].data.source.push(nodes[link.data.source]);
  });

  const data = Object.values(nodes);

  const copyData = cloneDeep(data);
  console.log(copyData);

  return [data, copyData];
}

function createNode(id) {
  return {
    group: 'nodes',
    data: {
      id: id,
      label: id,
      source: [],
      target: [],
      s: [],
      t: [],
    },
  };
}

function greedyCycleRemoval(nodes) {
  // todo ノード消したのにsourceとtarget更新してないからバグってる
  let sl = [];
  let sr = [];
  //ノードが存在するならループ
  while (nodes.length != 0) {
    console.log('nodes', nodes);
    console.log('sl', sl);
    console.log('sr', sr);
    //シンクが存在するならループ
    //シンクをnodesから消してsrの先頭に挿入
    while (nodes.filter((e) => e.data.target.length == 0).length != 0) {
      const sink = nodes.find((e) => e.data.target.length == 0);
      nodes.forEach((e) => {
        e.data.target = e.data.target.filter((f) => f.data.id != sink.data.id);
      });
      nodes = nodes.filter((e) => e.data.id != sink.data.id);
      console.log('sr sink', sink);
      sr.unshift(sink);
    }
    //ソースが存在するならループ
    //ソースをnodesから消してslの末尾に挿入
    while (nodes.filter((e) => e.data.source.length == 0).length != 0) {
      const source = nodes.find((e) => e.data.source.length == 0);
      nodes.forEach((e) => {
        e.data.source = e.data.source.filter(
          (f) => f.data.id != source.data.id,
        );
      });
      nodes = nodes.filter((e) => e.data.id != source.data.id);
      console.log('sl source', source);
      sl.push(source);
    }
    if (nodes.length != 0) {
      const max = Math.max(
        ...nodes.map((e) => e.data.target.length - e.data.source.length),
      );
      const maximumVertex = nodes.find(
        (e) => e.data.target.length - e.data.source.length == max,
      );
      console.log('sl maximumVertex', maximumVertex);
      nodes.forEach((e) => {
        e.data.target = e.data.target.filter(
          (f) => f.data.id != maximumVertex.data.id,
        );
        e.data.source = e.data.source.filter(
          (f) => f.data.id != maximumVertex.data.id,
        );
      });
      nodes = nodes.filter((e) => e.data.id != maximumVertex.data.id);
      sl.push(maximumVertex);
    }
  }
  console.log('nodes', nodes);
  console.log('sl', sl);
  console.log('sr', sr);
  return [sl.map((e) => e.data.id), sr.map((e) => e.data.id)];
}

function addHierarchy(data) {
  //最長パス法
  let d = [];
  data.forEach((e) => {
    d[e.data.id] = e;
  });
  const sourceNodes = data.filter((e) => e.data.source.length == 0);
  function aH(node, hierarchy) {
    const h = d[node.data.id].data.hierarchy;
    if (h == undefined) {
      d[node.data.id].data.hierarchy = hierarchy;
      node.data.target.forEach((e) => {
        //自己ループじゃない場合に再帰
        if (node != e) {
          aH(e, hierarchy + 1);
        }
      });
      node.data.source.forEach((e) => {
        //自己ループじゃない場合に再帰
        if (node != e) {
          aH(e, hierarchy - 1);
        }
      });
    }
  }
  sourceNodes.forEach((e) => aH(e, 0));
  const a = Object.keys(d).map((key) => d[key]);
  console.log('hierarchy', a);
  return a;
}

//閉路除去をする
//処理的にはエッジを反転するノードを返す
function removeCycles(data) {
  const removedNodes = [];
  // console.log(data);
  for (let i = 0; i < 100; i++) {
    updateSourceTarget(data);
    data = removeSourceSink(data);

    // console.log(data);

    const cycles = findCycles(data);
    console.log('cycles : ', cycles);
    if (cycles.length == 0) {
      break;
    }

    updateSourceTarget(data);
    const [d, r] = removeBigNode(data);
    data = d;
    removedNodes.push(r);
  }
  // console.log(data);
  return removedNodes.map((e) => e.data.id);
}

function removeSourceSink(data) {
  return data.filter(
    (e) => !(e.data.source.length == 0 || e.data.target.length == 0),
  );
}

function removeBigNode(data) {
  const max = Math.max(...data.map((e) => e.data.big));
  const removeNode = data.find((e) => e.data.big == max);
  // console.log('remove nodes : ', removeNode);
  return [data.filter((e) => e.data.id != removeNode.data.id), removeNode];
}

function updateSourceTarget(data) {
  const dataIds = data.map((e) => e.data.id);
  // console.log(dataIds);
  // console.log(data[0].data.source.filter((f) => dataIds.includes(f.data.id)));

  data.map((e) => {
    // console.log(e.data.source.filter((f) => dataIds.includes(f.data.id)));
    e.data.source = e.data.source.filter((f) => dataIds.includes(f.data.id));
    e.data.target = e.data.target.filter((f) => dataIds.includes(f.data.id));
    e.data.big = e.data.target.length - e.data.source.length;
  });
}

function findCycles(data) {
  var visited = {}; // ノードの訪問状態を記録するオブジェクト
  var finished = {};
  var cycles = []; // 閉路のリスト

  // 深さ優先探索関数
  function dfs(node, path) {
    if (visited[node.data.id]) {
      if (!finished[node.data.id]) {
        var cycleStart = path.indexOf(node.data.id);
        var cycle = path.slice(cycleStart); // 閉路の一部を取得

        cycles.push(cycle);
        // console.log('heiro', cycle);
      }
      return;
    }

    visited[node.data.id] = true;
    path.push(node.data.id);

    // console.log(nextNodes);
    node.data.target.forEach((e) => dfs(e, path.slice()));
    finished[node.data.id] = true;
  }

  // 各ノードに対してDFSを実行
  data.forEach((e) => {
    if (e.group == 'nodes') {
      dfs(e, []);
    }
  });

  return cycles;
}
