import { useRecoilValue } from 'recoil';
import {
  InputData,
  linksDataState,
  nodesDataState,
} from '../components/inputData';
import { Graph } from '../components/graph';

export default function Home({ Title }) {
  const nodesData = useRecoilValue(nodesDataState);
  const linksData = useRecoilValue(linksDataState);
  return (
    <div>
      <div>{Title}</div>
      <InputData />
      <Graph nodesData={nodesData} linksData={linksData} />
    </div>
  );
}
export async function getStaticProps() {
  const t = 'たいとる';
  return { props: { Title: t } };
}
