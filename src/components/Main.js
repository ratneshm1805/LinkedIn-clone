import { useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      {/* {props.articles.length === 0 ? (
        <p>THERE ARE NO ARTICLES</p>
      ) : ( */}
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} />
            ) : (
              <img src="/images/user.svg" />
            )}
            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
            >
              Share a Post
            </button>
          </div>
          <div>
            <button>
              <img
                src="https://img.icons8.com/color/48/000000/camera.png"
                onClick={handleClick}
              />
              <span onClick={handleClick}>Photo</span>
            </button>
            <button>
              {/* <img src="/images/video-icon.png" /> */}
              <img
                src="https://img.icons8.com/color/48/000000/video-call--v1.png"
                onClick={handleClick}
              />
              <span onClick={handleClick}>Video</span>
            </button>
            <button>
              {/* <img src="/images/event-icon.svg" /> */}
              <img
                src="https://img.icons8.com/color/48/000000/gallery.png"
                onClick={handleClick}
              />
              <span onClick={handleClick}>Events</span>
            </button>
            <button>
              <img src="/images/article-icon.svg" onClick={handleClick} />
              <span onClick={handleClick}>Article</span>
            </button>
          </div>
        </ShareBox>
        <Content>
          {props.loading && <img src="https://loading.io/asset/495513" />}
          {props.articles.length > 0 &&
            props.articles.map((article, key) => (
              <Article key={key}>
                <SharedActor>
                  <a>
                    <img src={article.actor.image}></img>
                    <div>
                      <span>{article.actor.title}</span>
                      <span>{article.actor.description}</span>
                      <span>
                        {article.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                  <button>
                    <img src="/images/Simple_icon_ellipsis.svg" />

                    {/* <img src="https://img.icons8.com/ios-glyphs/50/000000/ellipsis.png" />
                     */}
                    {/* <img src="https://img.icons8.com/ios-filled/50/000000/ellipsis.png" /> */}
                  </button>
                </SharedActor>
                <Description>{article.description}</Description>
                <SharedImg>
                  <a>
                    {!article.sharedImg && article.video ? (
                      <ReactPlayer width={"100%"} url={article.video} />
                    ) : (
                      article.sharedImg && <img src={article.sharedImg} />
                    )}
                  </a>
                </SharedImg>
                <SocialCount>
                  <li>
                    <button>
                      <img src="https://img.icons8.com/color/48/000000/facebook-like--v1.png" />
                      <img src="https://img.icons8.com/emoji/48/000000/nikita-clapping-hands-emoji.png" />
                      <span>75</span>
                    </button>
                  </li>
                  <li>
                    <a>{article.comments}</a>
                  </li>
                </SocialCount>
                <SocialActions>
                  <button>
                    <img src="https://img.icons8.com/dusk/64/000000/facebook-like.png" />

                    <span>Like</span>
                  </button>
                  <button onClick={handleClick}>
                    <img src="https://img.icons8.com/cute-clipart/64/000000/comments.png" />
                    <span>Comment</span>
                  </button>
                  <button onClick={handleClick}>
                    <img src="https://img.icons8.com/color/48/000000/share--v1.png" />
                    <span>Share</span>
                  </button>
                  <button onClick={handleClick}>
                    <img src="https://img.icons8.com/color-glass/48/000000/filled-sent.png" />
                    <span>Send</span>
                  </button>
                </SocialActions>
              </Article>
            ))}
        </Content>
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
      {/* )} */}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0/15%), 0 0 0 rgb(0 0 0 /20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.16);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 48px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 35px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &-:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: relative;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    /* border-radius: 100px; */
  }
`;
const Description = styled.div`
  padding: 6px 16px;

  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 15px;
    font-size: 12px;
    align-items: center;
  }
  button {
    display: flex;
    align-items: center;
    border: none;
  }
  img {
    height: 25px;
    width: 25px;
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  img {
    width: 25px;
    height: 25px;
  }
  button {
    border: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
