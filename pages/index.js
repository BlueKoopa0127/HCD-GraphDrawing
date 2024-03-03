import { useRecoilValue } from 'recoil';
import { InputData, graphDataState } from '../components/inputData';
import { Graph } from '../components/graph';

export default function Home({ Title }) {
  const graphData = useRecoilValue(graphDataState);
  return (
    <div>
      <div>{Title}</div>
      <InputData />
      <Graph data={[...graphData]} />
    </div>
  );
}
export async function getStaticProps() {
  const t = 'たいとる';
  return { props: { Title: t } };
}
