import {
    Card,
    Col,
    Row,
    Image,
    Button,
    message,
    Pagination,
    DatePicker,
    Radio,
    InputNumber,
    Checkbox,
} from "antd";
import "./clothes.less";
import {
    ClothesListQuery,
    ROOT,
    addClothes,
    deleteClothes,
    getClothesList,
} from "@api";
import { useEffect, useRef, useState } from "react";
import { Claire, Operate, Quarter, SortType } from "@enum";
import _ from "lodash";
import { getFormatDate } from "@service";
import ClothesPopup, { ClothesPopupData } from "./popup/ClothesPopup";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface ClothesList {
    id: string;
    pic: string;
    price: number;
    quarter: Quarter;
    date: number;
}

export function Clothes() {
    const modelRef = useRef();
    const [query, setQuery] = useState<ClothesListQuery>({
        price: {
            sort: SortType.NONE,
        },
        addDate: {
            sort: SortType.DESC,
        },
        quarters: [
            Quarter.Spring,
            Quarter.Summer,
            Quarter.Autumn,
            Quarter.Winter,
        ],
        page: 1,
        pageSize: Claire.pageSize,
    }); // 查询条件
    const [total, setTotal] = useState(0); // 列表总数
    const [clothesList, setList] = useState([]); // 展示的clothes列表
    const [ids, setIds] = useState<{ id: string; src: string }[]>([]); // 需要删除的clothes ids

    /** 获取列表 */
    const getList = () => {
        getClothesList(query).then((res: any) => {
            const { list, total } = res.data || {};
            setTotal(total);
            setList(list);
        });
    };

    useEffect(getList, [query]); // 模拟componentDidMount

    /** 添加clothes */
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
            addClothes(query).then(() => {
                message.success("添加成功~");
                getList();
            });
        }
    };

    const handleDelete = (clothesIds: { id: string; src: string }[]) => {
        if (_.isEmpty(clothesIds)) {
            message.warning("小主没有删除的选中项哦~");
        } else {
            deleteClothes(clothesIds).then(() => {
                message.success("删除成功~");
                setIds([]);
                getList();
            });
        }
    };

    const getSort = (value: SortType = SortType.NONE, doClick: Function) => {
        return (
            <Radio.Group
                onChange={(e) => doClick(e.target.value)}
                value={value}
            >
                <Radio.Button value={SortType.NONE}>无</Radio.Button>
                <Radio.Button value={SortType.ASC}>升序</Radio.Button>
                <Radio.Button value={SortType.DESC}>降序</Radio.Button>
            </Radio.Group>
        );
    };

    return (
        <div className="clothes-container">
            <div className="filter">
                <Card>
                    <Row gutter={20} style={{ height: 32, marginTop: "-14px" }}>
                        <Col span={2} style={{ lineHeight: "32px" }}>
                            日期
                        </Col>
                        <Col span={8}>
                            <DatePicker.RangePicker
                                onChange={(v: any) => {
                                    const data = Object.assign({}, query, {
                                        addDate: {
                                            ...query.addDate,
                                            min: v[0].$d.getTime(),
                                            max: v[1].$d.getTime(),
                                        },
                                    });

                                    setQuery(data);
                                }}
                            />
                        </Col>
                        <Col span={5}>
                            {getSort(query.addDate.sort, (v: SortType) => {
                                const data = Object.assign({}, query, {
                                    addDate: {
                                        ...query.addDate,
                                        sort: v,
                                    },
                                });

                                setQuery(data);
                            })}
                        </Col>
                        <Col span={2} style={{ lineHeight: "32px" }}>
                            季节
                        </Col>
                        <Col span={6} style={{ lineHeight: "32px" }}>
                            <Checkbox.Group
                                options={[
                                    { label: "春", value: Quarter.Spring },
                                    { label: "夏", value: Quarter.Summer },
                                    { label: "秋", value: Quarter.Autumn },
                                    { label: "冬", value: Quarter.Winter },
                                ]}
                                value={query.quarters}
                                onChange={(v) => {
                                    const data = Object.assign({}, query, {
                                        quarters: v,
                                    });

                                    setQuery(data);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row gutter={20} style={{ height: 32, marginTop: "4px" }}>
                        <Col span={2} style={{ lineHeight: "32px" }}>
                            价格
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                addonBefore="min"
                                onChange={(v) => {
                                    const data = Object.assign({}, query, {
                                        price: {
                                            ...query.price,
                                            min: v,
                                        },
                                    });
                                    setQuery(data);
                                }}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                addonBefore="max"
                                min={query.price?.min || 0}
                                onChange={(v) => {
                                    const data = Object.assign({}, query, {
                                        price: {
                                            ...query.price,
                                            max: v,
                                        },
                                    });
                                    setQuery(data);
                                }}
                            />
                        </Col>
                        <Col span={6}>
                            {getSort(query.price.sort, (v: SortType) => {
                                const data = Object.assign({}, query, {
                                    price: {
                                        ...query.price,
                                        sort: v,
                                    },
                                });

                                setQuery(data);
                            })}
                        </Col>
                        <Col span={6}></Col>
                        <Col span={2}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    // @ts-ignore
                                    modelRef.current.open({
                                        url: "",
                                        price: 0,
                                        quarter: Quarter.Spring,
                                    });
                                }}
                            >
                                添加
                            </Button>
                        </Col>
                    </Row>
                    <ClothesPopup
                        ref={modelRef}
                        popupType={Operate.Add}
                        addFunc={(data: ClothesPopupData) => handleAdd(data)}
                    />
                </Card>
            </div>
            <div className="clothes">
                <Card
                    style={{
                        display: _.isEmpty(clothesList) ? "none" : "block",
                    }}
                >
                    <Row className="clothes-list" gutter={20}>
                        {clothesList.map((clothes: ClothesList) => (
                            <Col
                                className="clothes-single"
                                key={clothes.id}
                                span={6}
                            >
                                <div className="hover-visible-container">
                                    <Image
                                        src={`${ROOT}/${clothes.pic}`}
                                        title={`价格：${clothes.price}\n季节：${
                                            Claire.quarterMap[clothes.quarter]
                                        }\n添加日期：${getFormatDate(
                                            `${clothes.date}`
                                        )}`}
                                    />
                                    <div className="clothes-tools hover-visible-item">
                                        <Button
                                            shape="circle"
                                            type="primary"
                                            className="error-icon"
                                            icon={<DeleteOutlined />}
                                            onClick={() => {
                                                handleDelete([
                                                    {
                                                        id: clothes.id,
                                                        src: clothes.pic,
                                                    },
                                                ]);
                                            }}
                                        />
                                        <Button
                                            shape="circle"
                                            type="primary"
                                            icon={<EditOutlined />}
                                        />
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <Row justify="end" className="clothes-pager">
                        <Pagination
                            simple
                            pageSize={Claire.pageSize}
                            current={query.page}
                            total={total}
                            onChange={(index: number) => {
                                const data = Object.assign({}, query, {
                                    page: index,
                                });
                                setQuery(data);
                            }}
                        />
                    </Row>
                </Card>
                <Card
                    style={{
                        display: _.isEmpty(clothesList) ? "block" : "none",
                    }}
                >
                    <p className="tip">主人，请上传衣服哦~</p>
                </Card>
            </div>
        </div>
    );
}
