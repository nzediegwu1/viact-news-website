import NewsModel from "./NewsModel";

export default interface NewsListResponse {
    count: number,
    next: string,
    previous: string,
    articles: NewsModel[]
}