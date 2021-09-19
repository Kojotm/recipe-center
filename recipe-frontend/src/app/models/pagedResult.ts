export class PagedResult<T>
{
    count: number = 0;
    pageIndex: number = 0;
    pageSize: number = 0;
    items: T[] = [];
}