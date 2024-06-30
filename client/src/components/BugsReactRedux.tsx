import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bugApiGetBugs } from "../store/entities/bugs";
import { BugQueryState } from "../store/types";
import { AppRootState } from "../store/configureStore";

function BugsReactRedux(): JSX.Element {
  const dispatch = useDispatch();
  // 1. SUBSCRIBING: We listen to any change from the store
  /**
   * Notice we specified only a part of the store
   * This approach prevent unnecessary re-renders and is consider best practice
   */
  const {
    loading,
    // @todo we should decide about what to do with this `data`
    // Either remove this or design the state to integrate "pagination"
    list: { data },
  } = useSelector<AppRootState, BugQueryState>((state) => state.bugs);

  useEffect(() => {
    dispatch(bugApiGetBugs());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <main>
        <h1>Bugs</h1>
        <div>{data && data.map((bug) => <p>{bug.description}</p>)}</div>
      </main>
    </section>
  );
}

export default BugsReactRedux;
