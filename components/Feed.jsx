"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="mt-16 prompt_layout">
          {data.map((post, index) => (
            <PromptCard
              key={post._id}
              post={post}
              index={index}
              handleTagClick={{ handleTagClick }}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center pt-10 text-[25px] font-bold">
          There is no post...
        </h1>
      )}
    </>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);

  const handleSearchChange = (e) => {
    let v = e.target.value.toLowerCase();

    setSearchText(v);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      // console.log(await data.reverse());
      const newdata = await data.reverse();
      setPosts(newdata);
      // setPosts();
    };
    fetchPost();
  }, []);

  const filteredData = posts.filter(
    (item) =>
      item.prompt.toLowerCase().includes(searchText) ||
      item.tag.toLowerCase().includes(searchText)
  );

  return (
    <>
      <section className="feed flex-col mt-10">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
      </section>
      <section className="feed ">
        <PromptCardList data={filteredData} handleTagClick={() => {}} />
      </section>
    </>
  );
};

export default Feed;
