import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, atom } from 'recoil';

export const relatedDataUrlState = atom({
  key: 'relatedDataUrlState',
  default:
    'https://script.googleusercontent.com/macros/echo?user_content_key=eZc5ZI_5uIjKgfMjH2_SPPMYv8cxFBIkWPUr_9ikfkgxhj6xeHMxsbhhkkxdnrGqqkBp81s-CMyKcTthGOMyNSb9b-CHg-7sm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNn7QRqOoEBV3cKWTQSamdgSRZrrPeIyZwphpZ0GlGts72gFKSD-1bAtb3NGIwK2-kjPHDGPMaez-XMAlwbU29ealZQvKNBeidz9Jw9Md8uu&lib=MlymDeyPZhGLLMUX4XnL84AHWkD4xvv7U',
});

export const linksDataState = atom({
  key: 'linksDataState',
  default: [],
});
export const nodesDataState = atom({
  key: 'nodesDataState',
  default: [],
});

export function InputData() {
  const relatedDataUrl = useRecoilValue(relatedDataUrlState);
  const [linksData, setLinksData] = useRecoilState(linksDataState);
  const [nodesData, setNodesData] = useRecoilState(nodesDataState);

  //console.log(linksData);
  //console.log(nodesData);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(relatedDataUrl);
      if (res.status == 200) {
        const text = await res.json();
        text[0].shift();
        const d = text[0].map((e) => {
          return {
            source: e[0],
            target: e[1],
          };
        });
        setLinksData(d);
      }
    };
    fetchData();
  }, [relatedDataUrl]);

  useEffect(() => {
    setNodesData(getNodesFromLinks(linksData));
  }, [linksData]);

  return <></>;
}

const getNodesFromLinks = (links) => {
  const nodes = [];

  links.forEach((link) => {
    if (!nodes.find((node) => node.id == link.source)) {
      nodes.push({ id: link.source });
    }
    if (!nodes.find((node) => node.id == link.target)) {
      nodes.push({ id: link.target });
    }
  });

  return nodes.filter((e) => e != '');
};
