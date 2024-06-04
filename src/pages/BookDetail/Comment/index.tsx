import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { FaPencil } from "react-icons/fa6";
import { GoX } from "react-icons/go";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";
import { useCommit } from "../../../BaskretContext";
import { useProduct } from "../../../Context";
import { useParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
interface ICommit {
  id: string | null;
  gmail: string;
  like: any;
  commit: string;
  url: string;
  rating: number;
  date: string;
  bookID: number;
}
interface ICommits{
  commitValue: string,
  day: number,
  month: number,
  year: number,
  star: number,
  inputs: boolean,
  commitId: string,
  editElement: ICommit | null | undefined,
  editValue: string,
  likeElement: ICommit | null | undefined,
}

const Comment = () => {
  const modalRef = useRef<any>(null);
  const { addCommit, commit, basketRemove, EditCommit }: any = useCommit();
  const { user, product }: any = useProduct();
  const [profile, setProfile] = useState<boolean>(false);
  const { Id } = useParams();
  // console.log("user", user);

  const [commits, setCommits] = useState<ICommits>({
    commitValue: "",
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    star: 1,
    inputs: false,
    commitId: "",
    editElement: null as ICommit | null | undefined,
    editValue: "",
    likeElement: null as ICommit | null | undefined,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);
  const handlePClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Предотвращаем всплытие события, чтобы модальное окно не закрывалось сразу же после открытия
    setProfile(false); // Закрываем модальное окно при клике на параграф
  };
  function Like(obj: ICommit) {
    if (!user){
      return;
    }
    let { like } = obj;
    if (like.some((el: string) => el === user.email)) {
      let element = [...like];
      EditCommit({
        ...obj,
        like: element.filter((el: string) => el !== user.email),
      });
      return;
    }
    EditCommit({ ...obj, like: [...like, user.email] });
  }
  function getCommits() {
    if(!user){
      return ;
    }
    if (commits.commitValue === "") {
      alert("зополните поле!");
      return;
    }
    if (commit.some((el: any) => el.commit === commits.commitValue)) {
      alert("такой коментарий уже есть!");
      return;
    }
    let Object: ICommit = {
      id: null,
      gmail: user.email,
      like: [],
      commit: commits.commitValue,
      url: user.photoURL ? user.photoURL : user.email[0],
      rating: commits.star,
      date: `${commits.day}.${commits.month}.${commits.year}`,
      bookID: Number(Id),
    };
    addCommit(Object);
    setCommits({
      ...commits,
      commitValue: (commits.commitValue = ""),
      star: 1,
      inputs: false,
    });
  }
  function CommitValue(e: React.ChangeEvent<HTMLInputElement>): void {
    let str = e.target.value;
    str = str !== "" ? str[0].toUpperCase() + str.slice(1, str.length) : "";
    if (commits.editElement) {
      setCommits({ ...commits, editValue: str });
    } else {
      setCommits({ ...commits, commitValue: str });
    }
  }
  function Edit() {
    if (commits.editValue === "") {
      alert("зополните поле!");
      return;
    }
    EditCommit({
      ...commits.editElement,
      commit: commits.editValue,
      rating: commits.star,
      date: `${commits.day}.${commits.month}.${commits.year}`,
    });
    setCommits({
      ...commits,
      editValue: "",
      star: 1,
      editElement: null,
      inputs: (commits.inputs = false),
    });
  }

  // function BooleanLike() {}
  // useEffect(() => {
  //   BooleanLike();
  // }, []);
  return (
    <div id="comment">
      <div className="container">
        <div className="comment">
          <h1>Отзывы:</h1>
          <div className="text">
            <div
              style={{
                borderBottom: commits.inputs ? "2px solid #fff" : "",
                height: commits.inputs ? "100px" : "35px",
              }}
              className="inputs"
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="input">
                  <input
                    onChange={CommitValue}
                    value={
                      commits.editElement
                        ? commits.editValue
                        : commits.commitValue
                    }
                    onClick={() => {
                      setCommits({ ...commits, inputs: true });
                    }}
                    type="text"
                    placeholder="Добавить отзыв"
                  />
                  <h2
                    style={{
                      fontSize: commits.inputs ? "30px" : "",
                    }}
                    onClick={() => {
                      setCommits({ ...commits, inputs: !commits.inputs });
                    }}
                  >
                    {commits.inputs ? <GoX /> : <FaPencil />}
                  </h2>
                </div>
                <div
                  className="reting"
                  style={{
                    transform: commits.inputs ? "" : "translate(0% , -100%)",
                    opacity: commits.inputs ? "1" : "0",
                    transition: ".5s",
                  }}
                >
                  <h3 onClick={() => setCommits({ ...commits, star: 1 })}>
                    {commits.star >= 1 ? (
                      <MdOutlineStarPurple500 />
                    ) : (
                      <MdOutlineStarBorderPurple500 />
                    )}
                  </h3>
                  <h3 onClick={() => setCommits({ ...commits, star: 2 })}>
                    {commits.star >= 2 ? (
                      <MdOutlineStarPurple500 />
                    ) : (
                      <MdOutlineStarBorderPurple500 />
                    )}
                  </h3>
                  <h3 onClick={() => setCommits({ ...commits, star: 3 })}>
                    {commits.star >= 3 ? (
                      <MdOutlineStarPurple500 />
                    ) : (
                      <MdOutlineStarBorderPurple500 />
                    )}
                  </h3>
                  <h3 onClick={() => setCommits({ ...commits, star: 4 })}>
                    {commits.star >= 4 ? (
                      <MdOutlineStarPurple500 />
                    ) : (
                      <MdOutlineStarBorderPurple500 />
                    )}
                  </h3>
                  <h3 onClick={() => setCommits({ ...commits, star: 5 })}>
                    {commits.star >= 5 ? (
                      <MdOutlineStarPurple500 />
                    ) : (
                      <MdOutlineStarBorderPurple500 />
                    )}
                  </h3>
                </div>
                <div
                  style={{
                    transform: commits.inputs ? "" : "translate(0% , -100%)",
                    opacity: commits.inputs ? "1" : "0",
                    transition: ".5s",
                  }}
                  className="buttons"
                >
                  {commits.editElement ? (
                    <button
                      onClick={() => {
                        Edit();
                      }}
                    >
                      Сохранить
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        getCommits();
                      }}
                    >
                      Отправить
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="blocks">
              {commit.map((el: ICommit, idx: number) => (
                <div key={idx} className="block">
                  <div className="div1">
                    {el.url.length !== 1 ? (
                      <img src={el.url} alt="" />
                    ) : (
                      <div className="photoURL">
                        <h5>{el.gmail[0]}</h5>
                      </div>
                    )}
                    <div className="reting">
                      <h3>{el.commit}</h3>
                      <h2
                        onClick={() => {
                          Like(el);
                        }}
                      >
                        {el.like.some(
                          (el: string) => el === (user ? user.email : "")
                        ) ? (
                          <BiSolidLike />
                        ) : (
                          <BiLike />
                        )}
                        {/* {el  ? <BiSolidLike /> : <BiLike />} */}
                        <span>
                          {el.like.length === 0 ? "" : el.like.length}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div
                    style={{
                      marginRight: user
                        ? el.gmail === user.email
                          ? ""
                          : "33px"
                        : "33px",
                    }}
                    className="div2"
                  >
                    <h2>
                      <span>
                        <MdOutlineStarPurple500 />{" "}
                      </span>{" "}
                      {el.rating}
                    </h2>
                    <p>{el.date}</p>
                    {el.id === commits.commitId ? (
                      <div
                        style={{
                          display: profile ? "block" : "none",
                        }}
                        ref={modalRef}
                        onClick={() => {
                          setProfile(true);
                        }}
                        className="modal"
                      >
                        <h3
                          onClick={(e) => {
                            handlePClick(e);
                            basketRemove(el.id);
                          }}
                        >
                          Удалить{" "}
                          <span>
                            <RiDeleteBin6Line />
                          </span>
                        </h3>
                        <h4
                          onClick={(e) => {
                            handlePClick(e);
                            setCommits({
                              ...commits,
                              editElement: el,
                              inputs: (commits.inputs = true),
                              editValue: (commits.editValue = el.commit),
                            });
                          }}
                        >
                          Изменить
                          <span>
                            <FaPencil />
                          </span>
                        </h4>
                      </div>
                    ) : null}
                  </div>
                  {user ? (
                    el.gmail === user.email ? (
                      <h1
                        onClick={() => {
                          setProfile(true);
                          setCommits({ ...commits, commitId: `${el.id}` });
                        }}
                      >
                        <TfiMoreAlt />
                      </h1>
                    ) : null
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
