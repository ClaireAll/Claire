import { Card, Col, Row, Image, Button, message, Pagination } from "antd";
import "./clothes.less";
import { ROOT, addClothes, getClothesList } from "@api";
import { useEffect, useRef, useState } from "react";
import { Claire, Quarter } from "@enum";
import _ from "lodash";
import { getFormatDate } from "@service";
import { ClothesPopup, ClothesPopupData } from "./popup/ClothesPopup";

interface ClothesList {
    id: string;
    pic: string;
    price: number;
    quarter: Quarter;
    date: number;
}

export function Clothes() {
    const modelRef = useRef();
    const [query, setQuery] = useState({price: {},
        addDate: {},
        quarters: [],
        page: 1,
        pageSize: Claire.pageSize,});
    const [total, setTotal] = useState(0);
    const [clothesList, setList] = useState([]);
    const getList = () => {
        getClothesList(query).then((res: any) => {
            const { list, total } = res.data || {};
            setTotal(total);
            setList(list);
        });
    }

    useEffect(getList, [query]); // 模拟componentDidMount

    const handleAdd = (data: ClothesPopupData) => {
        if (_.isEmpty(data.url)) {
            message.warning("主人，请上传一张图片哦~");
        } else {
            const { url, price, quarter } = data;
            const query = {
                pic: url,
                price,
                quarter,
            };
            addClothes(query).then((res: any) => {
                message.success("添加成功~");
                getList();
            });
        }
    }

    return (
        <div className="clothes-container">
            <div className="filter">
                <Card>
                    筛选
                    <Button
                        type="primary"
                        onClick={() => {
                            // @ts-ignore
                            modelRef.current.open(
                                {
                                    url: "",
                                    price: 0,
                                    quarter: Quarter.Spring,
                                },
                                (data: ClothesPopupData) =>
                                    handleAdd(data)
                            );
                        }}
                    >
                        添加
                    </Button>
                    <ClothesPopup ref={modelRef} />
                </Card>
            </div>
            <div className="clothes">
                <Card>
                    <Row justify="start" gutter={20}>
                        {clothesList.map((clothes: ClothesList) => (
                            <Col
                                className="clothes-single"
                                key={clothes.id}
                                span={6}
                            >
                                <Image
                                    src={`${ROOT}/${clothes.pic}`}
                                    title={`价格：${clothes.price}\n季节：${
                                        Claire.quarterMap[clothes.quarter]
                                    }\n添加日期：${getFormatDate(
                                        `${clothes.date}`
                                    )}`}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row justify="end">
                        <Pagination
                            simple
                            pageSize={Claire.pageSize}
                            current={query.page}
                            total={total}
                            onChange={(index: number) => {
                                const data = Object.assign(
                                    {},
                                    query,
                                    { page: index }
                                );
                                setQuery(data);
                            }}
                        />
                    </Row>
                </Card>
            </div>
        </div>
    );
}