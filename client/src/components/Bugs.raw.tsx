/**
 * This version doesn't take advantage of the react-redux library
 * This is provided only for educational / demonstration purposes
 * Check <BugsReactRedux /> for the react-redux approach
 */

import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/storeContext";
import { bugApiGetBugs } from "@/store/entities/bugs";
import type { AppStore } from "@store/configureStore";
import { Bug } from "@store/types";

export default function BugsRaw() {
  const store = useContext(StoreContext) as AppStore;
  const [bugs, setBugs] = useState<Bug[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const { list, loading } = store.getState().bugs;
      // @todo we have a type problem here because TS infers list to be Bug[] when it is { data: Bug[] }
      setBugs(list.data);
      setLoading(loading);
    });

    store.dispatch(bugApiGetBugs());

    /**
     * The clean-up function is important to prevent the following:
     *  - When the component will unmount (for example, when navigating out) the subscription will still live
     *  - Memory leaks
     **/
    return () => unsubscribe();
  }, [store]);

  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <main>
        <h1>Bugs</h1>
        <div>
          {bugs && (
            <ul>
              {bugs.map((bug) => (
                <li key={bug.id}>{bug.description}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </section>
  );
}
