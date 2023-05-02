import { useQuery } from "react-query";
import CatCardPanel from "../components/catCardPanel";
import CatCardCreator from "../components/catCardCreator";
import DemoFooter from "../components/demoFooter";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { UserData } from "@/types/global";
import { ToastContainer } from "react-toastify";

const DB_API_URI = "http://localhost:3001";
const inter = Inter({ subsets: ["latin"] });
// Mock userID for testing.
const userID = 42;

export default function App() {
  const endpoint = `${DB_API_URI}/users/${userID}`;
  const { isLoading, error, data } = useQuery(
    ["userData", userID],
    (): Promise<UserData> => fetch(endpoint).then((res) => res.json())
  );

  if (isLoading) return <div>"Loading..."</div>;

  if (error && error instanceof Error)
    return <div>{"An error has occurred: " + error.message}</div>;

  if (!data) return <div>No data</div>;

  return (
    <>
      <ToastContainer />
      <div className={styles.main}>
        <div className={styles.row}>
          <img width={"400"} src="snapon.svg" className={styles.headerImage} />
          <h1 className={inter.className}>Cat Club 🐱</h1>

          <div className={styles.description}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <CatCardCreator />
          </div>
          <div className={styles.col}>
            <CatCardPanel herd={data.herd} UserData={data.lastname} />
          </div>
        </div>
        <div className={styles.row}>
          <DemoFooter UserData={data.lastname} herd={[]} />
        </div>
      </div>
    </>
  );
}
