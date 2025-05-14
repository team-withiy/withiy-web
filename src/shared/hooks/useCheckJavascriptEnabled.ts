import { useEffect, useState } from "react";

/**
 *
 * @description - 자바스크립트가 활성화되어 있는지 확인하는 커스텀 훅. useActionState와 useForm을 같이 사용하여 javascript가 활성화 되었을 때 validation을 진행하기 위함
 * @returns {boolean} - 자바스크립트가 활성화되어 있는지 여부
 */
const useCheckJavascriptEnabled = () => {
  const [isJavascriptEnabled, setIsJavascriptEnabled] = useState(false);

  useEffect(() => {
    setIsJavascriptEnabled(true);
  }, []);

  return isJavascriptEnabled;
};

export default useCheckJavascriptEnabled;
