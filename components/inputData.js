import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, atom } from 'recoil';
import dagre from '@dagrejs/dagre';

export const relatedDataUrlState = atom({
  key: 'relatedDataUrlState',
  default:
    'https://script.googleusercontent.com/macros/echo?user_content_key=eZc5ZI_5uIjKgfMjH2_SPPMYv8cxFBIkWPUr_9ikfkgxhj6xeHMxsbhhkkxdnrGqqkBp81s-CMyKcTthGOMyNSb9b-CHg-7sm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNn7QRqOoEBV3cKWTQSamdgSRZrrPeIyZwphpZ0GlGts72gFKSD-1bAtb3NGIwK2-kjPHDGPMaez-XMAlwbU29ealZQvKNBeidz9Jw9Md8uu&lib=MlymDeyPZhGLLMUX4XnL84AHWkD4xvv7U',
});

export const graphDataState = atom({
  key: 'graphDataState',
  default: [],
});
export const dagreLayoutState = atom({
  key: 'dagreLayoutState',
  default: [],
});

export function InputData() {
  const relatedDataUrl = useRecoilValue(relatedDataUrlState);
  const [graphData, setGraphData] = useRecoilState(graphDataState);
  const [dagreLayout, setDagreLayout] = useRecoilState(dagreLayoutState);
  const list = [
    'IO',
    'RN',
    'PPRF_r',
    'AMY',
    'CEm',
    'Cx.L5PT',
    'NAc',
    'SNr',
    'PHN',
    'PMN',
    'Me5-p',
    'STH',
    'aSpC',
    'SCI',
    'PnC',
    'S_distal',
    'PaS',
    'NDB',
    'A35_uc1',
    'NLOT',
    'PPRF_l',
    'PAG',
    'ANC',
    'VISpor_uc2',
    'CM',
    'PaV',
    'INAdm',
    'HTHpo',
    'S',
    'IOFas',
    'rSCI',
    'RNpc',
    'PoFC.L4',
    'PFC.L3',
    'eSpC',
    'CBPVg',
    'FNCbp',
    'Cx.L3bIT',
    'Cx.L1',
    'SpC',
    'PrH',
    'SEF',
    'IOK',
    'INAvm',
    'ECu',
    'PPMRF',
    'AOB',
    'Cx.L6',
    'mPFC',
    'csp-h',
    'A35',
    'CBPVp',
    'g',
    'CEN',
    'NAC',
    'BL',
    'InPNO',
    'TT',
    'MN',
    'En',
    'LS',
    'Mo',
    'EC',
    'CA1_distal',
    'F2',
    'A8lv',
    'BA_E',
    'IODT',
    'MD',
    'PaS_uc1',
    'LH',
    '6N',
    'VeP',
    'TRN_matrix',
    'CA',
    'EC_II',
    'PPMRF_l',
    'Cx.L6IT',
    'Cx.L5IT',
    'MEC_deep',
    'HTHso',
    'Te2',
    'PRCv',
    'TRN_IL',
    'PL_vmPFC',
    'LP',
    'R',
    'CoP',
    'STR_patch',
    'DR',
    'CA1',
    'THM',
    'CBVp',
    'MTc',
    'VTA',
    'LG',
    'CBLp',
    'CBLg',
    'BNST',
    'DIg',
    'VISpor_uc1',
    'CA3',
    'LEC_deep_uc1',
    'InC',
    'PaRh',
    'CA2',
    'Re',
    'PILN',
    'CEl_off',
    'NCx',
    'Cx.L5IN',
    'DP',
    'CEl',
    'LEC_V',
    'NTS',
    'BF',
    'cSCI',
    'AIp',
    'Me',
    'AHA',
    'STR',
    'LD',
    'HTH',
    'La',
    'CBVg',
    'MVN',
    'vcMRF',
    'BA_F',
    'PBN',
    'LC',
    'PAC',
    'RSC_uc1',
    'PrS_uc1',
    'Nucleus acumens',
    'MVeMC',
    'TH',
    'MEC_V',
    'SCS',
    'VL_core',
    'IOInP',
    'InP',
    'S1C',
    'PTg',
    'brainstem',
    'FasNO',
    'PrS',
    'GPi',
    'A35_uc2',
    'MVEPC',
    'VeN',
    'PPRF',
    'PB',
    'TRN_core',
    'STR_matrix',
    'DG',
    'DLPN',
    'LEC_II',
    'Ret',
    'Cx.L2_3aIT',
    'Cx.L4',
    'INAl',
    'HIP',
    'PeVA',
    'Pir',
    'VAmc',
    'VA_core',
    'cMRF',
    'PN',
    'CA1_proximal',
    'Cx.L6IN',
    'RIP',
    'SubC',
    'PoFC',
    'Fas',
    'dcMRF',
    'OT',
    'PoFC.L3',
    'HN',
    'eRF',
    'RF',
    'BM',
    'Te2D',
    'p',
    'AIv',
    'FNCbg',
    'LEC_III',
    'Tu',
    'DFC',
    'AOP',
    'MSN',
    'PRCd',
    'PeF',
    'PoFC.L5',
    'DVC',
    'Cla',
    'MEC_I',
    'Pu',
    'DIv',
    'CbDN',
    'MG',
    'Te3',
    'VL',
    'LaD',
    'SNL',
    'Cx.L5',
    'RNmc',
    'AId',
    'VA',
    'IOVeN',
    'GPe',
    'Ca',
    'VISpor',
    'IL_vmPFC',
    'CS_input',
    'PP',
    'INA',
    '3N',
    'Medial septum',
    'MFC',
    'CoA',
    'Sol',
    'SNC',
    'SN',
    'BA',
    'CEl_on',
    'DTNO',
    'aRF',
    'DT',
    'RTg',
    'IsCj',
    'SC',
    'US_input',
    'LEC_deep',
    'IL',
    'FF',
    'FNCb',
    'MEC_II',
    'IODC',
    'CBV',
    'PL',
    'SNR',
    'PPMRF_r',
    'MEC_III',
    'VMH',
    'LaV',
    'MDJ',
    'A8.L5PT',
    'Po',
    'S_proximal',
    'VG',
    'PFC.L2',
    'AB',
    'Pf',
    'TC',
    'Cx.L6CT',
  ];

  console.log(graphData);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(relatedDataUrl);
      if (res.status == 200) {
        const text = await res.json();
        text[0].shift();
        const edges = text[0]
          .filter((e) => list.includes(e[0]) && list.includes(e[1]))
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

        const nodes = getNodesFromLinks(edges);
        const nodesObject = {};
        const edgesObject = {};
        nodes.forEach((e) => (nodesObject[e.data.id] = e));
        edges.forEach((e) => (edgesObject[e.data.id] = e));
        console.log('nodes', nodes);
        console.log('edges', edges);
        console.log('nodesObject', nodesObject);

        const cycles = findCycles(nodes, nodesObject);
        console.log(cycles);

        const fas = minimumFAS();
        console.log('fas', fas);

        const reversedEdges = edges.map((e) => {
          // const isInCycle = inCycles(e);
          const isChange = fas.includes(e.data.id);
          if (isChange) {
            return {
              group: 'edges',
              classes: ['removedEdge'],
              data: {
                id: e.data.id,
                source: e.data.target,
                target: e.data.source,
              },
            };
          }
          return e;
        });

        function minimumFAS() {
          const Ea = []; // 非巡回部分グラフのエッジ
          const processed = []; // 処理済みの頂点

          // メインアルゴリズム
          for (let vertex of nodes) {
            if (!processed.includes(vertex.data.id)) {
              const targetCount = vertex.data.target.length;
              const sourceCount = vertex.data.source.length;

              if (targetCount >= sourceCount) {
                for (let targetId of vertex.data.target) {
                  if (!processed.includes(targetId)) {
                    const edge = edgesObject[vertex.data.id + '-' + targetId];
                    Ea.push(edge.data.id);
                  }
                }
              } else {
                for (let sourceId of vertex.data.source) {
                  if (!processed.includes(sourceId)) {
                    const edge = edgesObject[sourceId + '-' + vertex.data.id];
                    Ea.push(edge.data.id);
                  }
                }
              }

              // 処理済みの頂点に追加
              processed.push(vertex.data.id);
            }
          }

          // Eaに含まれないエッジがFASとなる
          const FAS = edges
            .filter((edge) => !Ea.includes(edge.data.id))
            .map((e) => e.data.id);
          console.log('Ea', Ea);

          return FAS;
        }
        const d = nodes.concat(edges);

        // console.log(d);
        const dagreLayout = getDagreLayout(d);
        setDagreLayout(dagreLayout);
        // console.log('dagre layout', dagreLayout);

        const initialPositionNodes = nodes.map((e) => {
          const f = dagreLayout.node(e.data.label);
          return {
            ...e,
            position: { x: f.x, y: f.y },
            data: { ...e.data, rank: f.rank },
          };
        });
        console.log('initial', initialPositionNodes);

        const edgesName = edges.map((e) => e.data.id);
        const mutualEdges = edges
          .map((e) => {
            if (edgesName.includes(e.data.target + '-' + e.data.source)) {
              return { ...e, classes: ['removedEdge'] };
            }
            return e;
          })
          .filter((e) =>
            dagreLayout.edge({ v: e.data.source, w: e.data.target }),
          );

        const removedCyclesNodes = getNodesFromLinks(reversedEdges);

        const cycle = findCycles(removedCyclesNodes);
        console.log('removed cycle list', cycle);

        const addHierarchyData = addHierarchy(removedCyclesNodes);
        console.log('hierarchy', addHierarchyData);

        setGraphData(initialPositionNodes.concat(mutualEdges));
        // setGraphData(addHierarchyData.concat(reversedEdges));
      }
    };
    fetchData();
  }, [relatedDataUrl]);

  return <></>;
}

function getDagreLayout(data) {
  var g = new dagre.graphlib.Graph({ compound: false });

  // Set an object for the graph label
  g.setGraph({
    rankdir: 'TB', // 'TB' for top to bottom layout
    nodesep: 2, // horizontal space between nodes
    edgesep: 2, // horizontal space between edges
    ranksep: 5, // vertical space between nodes
    marginx: 20,
    marginy: 20,
  });

  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  data.map((e) => {
    if (e.group == 'nodes') {
      g.setNode(e.data.label, {
        label: e.data.label,
        width: 1,
        height: 1,
      });
    } else {
      if (g.edge({ v: e.data.target, w: e.data.source })) {
        // console.log('相互参照', e.data.source);
        // const parent = 'Parent_' + e.data.source + '_' + e.data.target;
        // g.setNode(parent, {
        //   label: parent,
        //   width: 1,
        //   height: 1,
        // });
        // g.setParent(e.data.source, parent);
        // g.setParent(e.data.target, parent);
      }
      if (g.edge({ v: e.data.source, w: e.data.target })) {
        console.log('二重辺', e.data.source, e.data.target);
        return;
      }

      if (e.data.source == e.data.target) {
        console.log('自己ループ', e.data.source);
        return;
      }
      // } else {
      //   g.setEdge(e.data.source, e.data.target);
      // }
      g.setEdge(e.data.source, e.data.target);
    }
  });
  dagre.layout(g);
  return g;
}

function inCycles(edge, cycles) {
  for (let i = 0; i < cycles.length; i++) {
    const e = cycles[i];
    for (let j = 0; j < e.length; j++) {
      const id = j === 0 ? `${e[e.length - 1]}-${e[0]}` : `${e[j - 1]}-${e[j]}`;
      // console.log(id);
      // console.log(edge.data.id);
      if (edge.data.id === id) {
        return true;
      }
    }
  }
  return false;
}

export function getNodesFromLinks(links) {
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
    nodes[link.data.source].data.target.push(nodes[link.data.target].data.id);
    nodes[link.data.target].data.source.push(nodes[link.data.source].data.id);
  });

  return Object.values(nodes);
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

function addHierarchy(data) {
  //最長パス法
  let d = [];
  data.forEach((e) => {
    d[e.data.id] = e;
  });
  const sourceNodes = data.filter((e) => e.data.source.length == 0);
  function aH(node, hierarchy) {
    const h = d[node.data.id].data.hierarchy;
    if (h == undefined || h < hierarchy) {
      d[node.data.id].data.hierarchy = hierarchy;
      node.data.target.forEach((e) => {
        //自己ループじゃない場合に再帰
        const targetNode = d[e];
        if (node.data.id != targetNode.data.id) {
          // console.log(node.data.id);
          // console.log(targetNode.data.id);
          aH(targetNode, hierarchy + 1);
        }
      });
    }
  }
  sourceNodes.forEach((e) => aH(e, 0));
  const a = Object.keys(d).map((key) => d[key]);
  // console.log('hierarchy', a);
  return a;
}

function findCycles(nodes, nodesObject) {
  if (nodesObject == undefined) {
    nodesObject = {};
    nodes.forEach((e) => (nodesObject[e.data.id] = e));
  }
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
    node.data.target.forEach((e) => dfs(nodesObject[e], path.slice()));
    finished[node.data.id] = true;
  }

  // 各ノードに対してDFSを実行
  nodes.forEach((e) => {
    if (e.group == 'nodes') {
      dfs(e, []);
    }
  });

  return cycles;
}
