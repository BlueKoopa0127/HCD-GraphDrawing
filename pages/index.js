import { useRecoilValue } from 'recoil';
import { InputData, graphDataState } from '../components/inputData';
import { Graph } from '../components/graph';

export default function Home({ Title }) {
  const graphData = useRecoilValue(graphDataState);
  InputData();

  const sampleData = Array.from({ length: 8 }, (_, i) => {
    return {
      group: 'nodes',
      data: {
        id: `node${i}`,
        label: `${i}`,
        level: i % 4,
      },
    };
  });
  const sampleEdge = [
    { group: 'edges', data: { id: '1-2', source: 'node1', target: 'node2' } },
    { group: 'edges', data: { id: '2-3', source: 'node2', target: 'node3' } },
    { group: 'edges', data: { id: '3-1', source: 'node3', target: 'node1' } },
    { group: 'edges', data: { id: '1-4', source: 'node1', target: 'node4' } },
  ];
  console.log(sampleData.concat(sampleEdge));
  return (
    <div>
      <div>{Title}</div>
      <Graph data={[...graphData]} />
    </div>
  );
}
export async function getStaticProps() {
  const t = 'たいとる';
  return { props: { Title: t } };
}
