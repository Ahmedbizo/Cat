export interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  wallet: number;
  herd: CatCardProps[];
}

export interface CatCardProps {
  url: string;
  nickname: string;
  imageID: string;
  imageURI: string;
  breed?: string;
  breedId?: string;
  width?: number;
  height?: number;
}
