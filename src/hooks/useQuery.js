import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  // Get a specific query parameter value
  const getParam = (key) => query.get(key);

  // Get all query parameters as an object
  const getAllParams = () => {
    const params = {};
    for (let [key, value] of query.entries()) {
      params[key] = value;
    }
    return params;
  };

  // Set or update a query parameter
  const setParam = (key, value) => {
    query.set(key, value);
    navigate({ search: query.toString() }, { replace: true });
  };

  // Remove a query parameter
  const removeParam = (key) => {
    query.delete(key);
    navigate({ search: query.toString() }, { replace: true });
  };

  return {
    query,
    getParam,
    getAllParams,
    setParam,
    removeParam,
  };
}

export default useQuery;
