import { useState, useEffect } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterPosts, setFilterPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        setFilterPosts(data.posts);
      });
  }, []);

  useEffect(() => {
    const filterPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
    setFilterPosts(filterPosts);
  });

  function inputSearch(event) {
    setSearch(event.target.value);
  }

  return (
    <>
      <div className="container mt-3">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search Posts"
          onChange={(event) => inputSearch(event)} //onChange={(event) => setSearch(event.target.value)}
        />

        {filterPosts.map((post, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{post.title}</h5>
                <p className="fw-bold">
                  Reaction
                  <span className="badge bg-danger text-dark">
                    {post.reactions}
                    {""}
                  </span>
                </p>
              </div>

              <p className="card-text">{post.body}</p>

              <div className="d-flex">
                {post.tags.map((tag, index) => (
                  <span class="badge rounded-pill bg-primary justify-content-between">
                    {post.tags[index]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
