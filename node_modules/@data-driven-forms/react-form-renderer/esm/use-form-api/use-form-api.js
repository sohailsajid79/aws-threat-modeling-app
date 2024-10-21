import { useContext } from 'react';
import RendererContext from '../renderer-context';

var useFormApi = function useFormApi() {
  var _useContext = useContext(RendererContext),
      formOptions = _useContext.formOptions;

  return formOptions;
};

export default useFormApi;