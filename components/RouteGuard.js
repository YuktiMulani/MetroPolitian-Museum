import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSearchHistoryState, useFavouriteListState } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { searchHistoryAtom } from "@/store";
import { favouritesAtom } from "@/store";
import { isAuthenticated } from "@/lib/authenticate";
import { useAtom } from "jotai";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];
function RouteGuard(props) {
  const router = useRouter();
  const [favouriteLists, setFavouritesLists] = useAtom(favouritesAtom)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  const [authorized, setAuthorized] = useState(false);

  const updateAtoms = async () => {
    setFavouritesLists(await getFavourites());
    setSearchHistory(await getHistory());
  };

  useEffect(() => {
    updateAtoms();
  }, []);

  useEffect(() => {
    authCheck(router.pathname);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {

    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>;
}

export default RouteGuard;
