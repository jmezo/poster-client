export class Comment {
  constructor(
    public id: number,
    public postId: number,
    public commenter: string,
    public text: string,
    public creationDate: number,
    public numOfLikes: number
  ) { }
}