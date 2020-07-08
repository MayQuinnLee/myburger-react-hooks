import { useState, useEffect } from "react";

export default (httpClient) => {
  //in our project is axios, but it can be anything
  const [error, setError] = useState(null);

  //cannot use useEffect() because we want to render this before JSX
  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
    //when sending request, we have to return the request so that the request can continue
  }); //not concern on the request, but want to clear the error
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
    }
  );

  useEffect(() => {
    //when using return we can cleanup
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [
    httpClient.interceptors.request,
    httpClient.interceptors.response,
    reqInterceptor,
    resInterceptor,
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
  //you can return whatever you want in custom hook, coincidentally look like useState
};
