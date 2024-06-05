import { useRecoilValue } from 'recoil';
import {
  InputData,
  getNodesFromLinks,
  graphDataState,
} from '../components/inputData';
import { Graph } from '../components/graph';
import { D3Graph } from '../components/d3Graph';
import { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep'; // ディープコピーを行うためにlodashを使用

export default function Home({ Title }) {
  const graphData = useRecoilValue(graphDataState);
  InputData();

  const [graphData2, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('chris.json');
      if (res.status == 200) {
        const text = await res.json();
        console.log(text);
        const edges = text.links.map((e) => {
          return {
            group: 'edges',
            data: {
              id: e.source + '-' + e.target,
              source: e.source,
              target: e.target,
            },
          };
        });
        const nodes = getNodesFromLinks(edges);
        setGraphData(nodes.concat(edges));
      }
    };
    fetchData();
  }, []);

  console.log(graphData2);

  // const sampleData = Array.from({ length: 8 }, (_, i) => {
  //   return {
  //     group: 'nodes',
  //     data: {
  //       id: `node${i}`,
  //       label: `${i}`,
  //       level: i % 4,
  //     },
  //   };
  // });
  // const sampleEdge = [
  //   { group: 'edges', data: { id: '1-2', source: 'node1', target: 'node2' } },
  //   { group: 'edges', data: { id: '2-3', source: 'node2', target: 'node3' } },
  //   { group: 'edges', data: { id: '3-1', source: 'node3', target: 'node1' } },
  //   { group: 'edges', data: { id: '1-4', source: 'node1', target: 'node4' } },
  // ];
  // console.log(sampleData.concat(sampleEdge));
  const copy = cloneDeep(graphData);
  return (
    <div>
      <div>{Title}</div>
      {/* <D3Graph data={[...graphData]} /> */}
      {<Graph data={[...copy]} />}
    </div>
  );
}
export async function getStaticProps() {
  const t = 'たいとる';
  return { props: { Title: t } };
}
