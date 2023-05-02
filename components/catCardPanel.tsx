import { CatCardProps } from "@/types/global";
import styles from "@/styles/CardPanel.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const CatCard: React.FC<CatCardProps> = ({
  nickname,
  imageURI,
  breed,
  breedId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [likedCats, setLikedCats] = useState<string[]>([]);

  const submitComment = () => {
    if (!commentText) {
      const message = `You have to add Comment before submit!!`;
      toast.error(message);
    } else {
      setComments([...comments, commentText]);
      setCommentText("");
      toast.success("Comment added successfully!");
    }
  };
  const toggleLike = (nickname: string) => {
    if (likedCats.includes(nickname)) {
      setLikedCats(likedCats.filter((name) => name !== nickname));
    } else {
      setLikedCats([...likedCats, nickname]);
    }
  };
  return (
    <div>
      <h2 className={styles.nickName}>{nickname}</h2>
      <img
        width={"400"}
        height={"300"}
        className={styles.panelImage}
        src={imageURI}
        alt={`Picture of ${nickname}`}
      />
      <button
        className={styles.likeButton}
        onClick={() => toggleLike(nickname)}
      >
        <FontAwesomeIcon
          icon={faHeart}
          className={`${styles.likeIcon} ${
            likedCats.includes(nickname) ? styles.liked : ""
          }`}
        />
        {likedCats.includes(nickname) ? "Liked" : "Like"}
      </button>
      <div>
        <ul>
          {comments.map((comment) => (
            <li key={comment}>* {comment}</li>
          ))}
        </ul>

        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className={styles.commentInput}
          placeholder="Add your comment"
        />
        <button className={styles.submitComment} onClick={submitComment}>
          Submit
        </button>
      </div>
    </div>
  );
};

const CatCardPanel = (props: { herd: CatCardProps[]; UserData: string }) => {
  return (
    <div className={styles.catList}>
      <h1 className={styles.listHeader}>{props.UserData}'s Herd</h1>

      <div className={styles.cardCat}>
        {props.herd.map((cat) => (
          <CatCard {...cat} key={cat.nickname} />
        ))}
      </div>
    </div>
  );
};
export default CatCardPanel;
