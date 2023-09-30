"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={{ handleTagClick }}
        />
      ))}
    </div>
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

      setPosts(data);
    };
    fetchPost();
  }, []);

  const filteredData = posts.filter(
    (item) =>
      item.prompt.toLowerCase().includes(searchText) ||
      item.tag.toLowerCase().includes(searchText)
  );

  return (
    <section className="feed">
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
      <PromptCardList data={filteredData} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
