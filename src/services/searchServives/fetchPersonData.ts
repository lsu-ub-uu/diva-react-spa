import axios from 'axios';

export const fetchPersonData = async (paramObject: any) => {
  const returnObject = paramObject;
  const PROD_CORA_API_URL = 'https://cora.diva-portal.org/diva/rest/';

  const { requestMethod, rel, url, accept } = paramObject;

  const axiosRequestMethod = requestMethod.toLowerCase();

  // console.log(axiosRequestMethod);
  const config = {
    headers: {
      Accept: accept,
    },
  };

  const response = await axios.get(url, config);
  const responseData = response.data.record.data;
  // console.log('resD', responseData);
  Object.entries(responseData).forEach((children) => {
    // console.log('child', children);
    children.forEach((child) => {
      console.log(child);
    });
    /* Object.entries(children).forEach((child) => {
      console.log('child', child);
    }); */
  });
};
