import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bugApiAddBug,
  bugApiDeleteBug,
  bugApiListBugs,
  bugApiResolveBug,
} from "@store/entities/bugs";
import type { Bug, BugQueryState } from "@store/types";
import type { AppRootState } from "@store/configureStore";

function BugsReactRedux(): JSX.Element {
  const [newBugInput, setNewBugInput] = useState("");
  const dispatch = useDispatch();
  // 1. SUBSCRIBING: We listen to any change from the store
  /**
   * Notice we specified only a part of the store
   * This approach prevent unnecessary re-renders and is consider best practice
   */
  const { loading, data } = useSelector<AppRootState, BugQueryState>(
    (state) => state.bugs
  );

  useEffect(() => {
    dispatch(bugApiListBugs());
  }, [dispatch]);

  const handleAdd = () => {
    if (!newBugInput) return;
    dispatch(
      bugApiAddBug({
        description: newBugInput,
      })
    );
    setNewBugInput("");
  };

  const handleResolve = (bug: Bug) => {
    dispatch(bugApiResolveBug(bug));
  };

  const handleDelete = (bug: Bug) => {
    dispatch(bugApiDeleteBug(bug));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <main>
        <h2>Bugs</h2>
        <div>
          {data &&
            data.map((bug: Bug) => (
              <BugCard
                key={bug.id}
                bug={bug}
                handleDelete={handleDelete}
                handleResolve={handleResolve}
              />
            ))}
        </div>
        <h2>New Bug</h2>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={newBugInput}
              title="New Bug Title"
              onChange={(e) => setNewBugInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add New Bug</button>
          </form>
        </div>
      </main>
    </section>
  );
}

function BugCard({
  bug,
  handleDelete,
  handleResolve,
}: {
  bug: Bug;
  handleDelete: (bug: Bug) => void;
  handleResolve: (bug: Bug) => void;
}) {
  return (
    <ul>
      <li>
        ID: {bug.id} <button onClick={() => handleDelete(bug)}>Delete</button>
      </li>
      <li>DESCRIPTION: {bug.description}</li>
      <li>
        STATUS: {bug.resolved ? "Resolved" : "Pending"}{" "}
        {!bug.resolved && (
          <button onClick={() => handleResolve(bug)}>Resolve</button>
        )}
      </li>
      <li>ASSIGNED: {bug.user?.name}</li>
    </ul>
  );
}

export default BugsReactRedux;
