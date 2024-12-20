import { useAtom } from "jotai";
import { ComponentProps, FC, useEffect, useState } from "react";
import { localStorageService } from "@/lib/PersistanceService";
import { wordsDatabaseAtom } from "@/lib/StateAtom";

interface PersistanceProps extends ComponentProps<any> {
  children: React.ReactNode;
}

export const PersistanceWrapper: FC<PersistanceProps> = (props) => {
  const { children } = props;
  const [words, setWords] = useAtom(wordsDatabaseAtom);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      if (words.length === 0) {
        const loadedWords = localStorageService.get();
        setWords(loadedWords);
      }
      /*prettier-ignore*/ console.log("[PersistanceWrapper.tsx,17] words: ", words);

      setLoaded(true);
    } else {
      localStorageService.set(words);
    }
  }, [words]);

  if (!loaded) return <>Loading...</>;
  return <>{children}</>;
};
