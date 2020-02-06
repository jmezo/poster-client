export class Post {
  constructor(
    public id: number,
    public text: string,
    public hasImage: boolean,
    public url: string,
    public creationDate: number,
    public creator: string,
    public numOfLikes: number,
    public numOfComments: number
  ) {}
}