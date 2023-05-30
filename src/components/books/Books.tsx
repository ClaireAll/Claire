import { BookLabels, Claire, SortType } from "@enum";
import { BookListQuery, getBookList } from "@api";
import { useEffect, useState } from "react";
import "./book.less";

interface BookList {
    id: string;
    name: string;
    price: number;
    pic: string;
    date: string;
    labels: BookLabels[];
}

export function Books() {
    const [query, setQuery] = useState<BookListQuery>({
        price: {
            sort: SortType.NONE,
        },
        addDate: {
            sort: SortType.DESC,
        },
        labels: [],
        keyword: "",
        page: 1,
        pageSize: Claire.pageSize,
    });
    const [bookList, setList] = useState<BookList[]>([]);
    const [total, setTotal] = useState<number>(0); // 列表总数

    /** 获取列表 */
    const getList = () => {
        getBookList(query).then((res: any) => {
            const { list, total } = res.data || {};
            setTotal(total);
            setList(list);
        });
    };

    useEffect(getList, [query]); // 模拟componentDidMount

    const createBook = (books: BookList[]) =>
        books.map((book) => <div key={book.id}>{book.name}</div>);

    return (
        <div className="book-container">
            <div className="left-page">{createBook(bookList.slice(0, 4))}</div>
            <div className="right-page">{createBook(bookList.slice(4, 8))}</div>
            <div className="middle-gap"></div>
        </div>
    );
}
