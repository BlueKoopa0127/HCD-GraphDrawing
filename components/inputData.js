import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, atom } from 'recoil';
import dagre from '@dagrejs/dagre';

export const relatedDataUrlState = atom({
  key: 'relatedDataUrlState',
  default:
    'https://script.googleusercontent.com/macros/echo?user_content_key=g6sfhUHXM_q9bHHRepK7ZgMH1Bf6soqAkmTJ7hmQrGsFZJgzNkFpUr8rQZe6h6oeSfJy1wU5WNnFBBXDGEPtKRJzuC8jx3v4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMkc8iDnczd--0mYgKGzQv88P0Z9qHflwb8RHSuKpWiEl2-3trjPTbyJz7_OtDp2Jn2xZ0A_UJ788RjU6nYulyL2VFJOhI-QcNz9Jw9Md8uu&lib=MKxHInl40nO0X9VMVsZQb7jQfreIY07W7',
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(relatedDataUrl);
      if (res.status == 200) {
        const text = await res.json();
        text[0].shift();
        const edges = text[0]
          // .filter((e) => list.includes(e[0]) && list.includes(e[1]))
          .filter((e) => !(e[0] == '' || e[1] == ''));

        const compound = text[2];
        console.log('Compound', compound);

        const nodes = getNodesFromLinks(edges);
        console.log('Nodes', nodes);

        const graph = nodes.concat(edges);
        const dagreLayout = getDagreLayout(nodes, edges, compound);
        setDagreLayout(dagreLayout);
      }
    };
    fetchData();
  }, [relatedDataUrl]);

  useEffect(() => {
    console.log('dagre', dagreLayout);
    // const initialPositionNodes = nodes.map((e) => {
    //   const f = dagreLayout.node(e.data.label);
    //   return {
    //     ...e,
    //     position: { x: f.x, y: f.y },
    //     data: { ...e.data, rank: f.rank },
    //   };
    // });
    // console.log('initial', initialPositionNodes);
    // const edgesName = edges.map((e) => e.data.id);
    // const mutualEdges = edges
    //   .map((e) => {
    //     if (edgesName.includes(e.data.target + '-' + e.data.source)) {
    //       return { ...e, classes: ['removedEdge'] };
    //     }
    //     return e;
    //   })
    //   .filter((e) => dagreLayout.edge({ v: e.data.source, w: e.data.target }));
    // setGraphData(initialPositionNodes.concat(mutualEdges));
    // // setGraphData(addHierarchyData.concat(reversedEdges));
  }, [dagreLayout]);

  return <></>;
}

function getDagreLayout(nodes, edges, compound) {
  var g = new dagre.graphlib.Graph({
    directed: true,
    compound: true,
    multigraph: false,
  });

  // Set an object for the graph label
  g.setGraph({
    rankdir: 'TB', // 'TB' for top to bottom layout
    nodesep: 50, // horizontal space between nodes
    edgesep: 10, // horizontal space between edges
    ranksep: 50, // vertical space between nodes
    marginx: 100,
    marginy: 100,

    acyclicer: 'greedy',
    ranker: 'longest-path',
  });

  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function () {
    return {};
  });
  if (false) {
    nodes = [
      'CS_input',
      'US_input',
      'LaV',
      'LaD',
      'BA_F',
      'BA_E',
      'INAdm',
      'INAvm',
      'output',
      'CA1',
      'La',
      'BA',
      'INA',
    ];
    edges = [
      ['CS_input', 'LaV'],
      ['CS_input', 'LaD'],
      ['US_input', 'LaV'],
      ['US_input', 'LaD'],
      ['LaV', 'BA_F'],
      ['LaV', 'BA_E'],
      ['LaV', 'INAdm'],
      ['LaD', 'BA_F'],
      ['LaD', 'BA_E'],
      ['LaD', 'INAdm'],
      ['BA_F', 'output'],
      ['BA_E', 'INAvm'],
      ['INAdm', 'INAvm'],
      ['INAvm', 'INAdm'],
      ['INAvm', 'BA_F'],
      ['CA1', 'BA_E'],
    ];
    compound = [
      ['La', ['LaV', 'LaD']],
      ['BA', ['BA_E', 'BA_F']],
      ['INA', ['INAdm', 'INAvm']],
    ];
  }
  nodes.map((e) => {
    g.setNode(e, { label: e, width: 10, height: 10 });
  });

  edges.map((e) => {
    g.setEdge(e[0], e[1]);
  });

  compound.map((e) => {
    e[1].map((f) => {
      if (e[0] != f) {
        g.setParent(f, e[0]);
      }
    });
  });

  console.log(g);
  // dagre.layout(g);
  return g;
}

export function getNodesFromLinks(edges) {
  let graph = {};

  edges.forEach((e) => {
    if (!graph[e[0]]) {
      graph[e[0]] = createNode(e[0]);
    }
    if (!graph[e[1]]) {
      graph[e[1]] = createNode(e[1]);
    }
  });

  edges.forEach((e) => {
    graph[e[0]].target.push(graph[e[1]].id);
  });

  return Object.values(graph);
}

function createNode(id) {
  return {
    id: id,
    target: [],
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
