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
import "./pants.less";
import {
    ClothesListQuery,
    ROOT,
    addPants,
    deletePants,
    editPants,
    getPantsList,
} from "@api";
import { useEffect, useRef, useState } from "react";
import { Claire, Operate, Quarter, SortType } from "@enum";
import _ from "lodash";
import { getFormatDate } from "@service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ClothesPopup, { ClothesPopupData } from "../clothes/popup/ClothesPopup";

interface PantsList {
    id: string;
    pic: string;
    price: number;
    quarter: Quarter;
    date: number;
}

export function Pants() {
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
    const [pantsList, setList] = useState([]); // 展示的pants列表
    const [ids, setIds] = useState<{ id: string; src: string }[]>([]); // 需要删除的pants ids
    let isEditing: boolean = false;

    /** 获取列表 */
    const getList = () => {
        getPantsList(query).then((res: any) => {
            const { list, total } = res.data || {};
            setTotal(total);
            setList(list);
        });
    };

    useEffect(getList, [query]); // 模拟componentDidMount

    /** 添加pants */
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
            addPants(query).then(() => {
                message.success("添加成功~");
                getList();
            });
        }
    };

    /** 编辑pants */
    const handleEdit = (data: ClothesPopupData) => {
        if (_.isEmpty(data.url)) {
            message.warning("主人，请上传一张图片哦~");
        } else {
            const { id, url, price, quarter } = data;
            const query = {
                id: id || '',
                pic: url,
                price,
                quarter,
            };
            editPants(query).then(() => {
                message.success("编辑成功~");
                getList();
            });
        }
    };

    const handleDelete = (pantsIds: { id: string; src: string }[]) => {
        if (_.isEmpty(pantsIds)) {
            message.warning("小主没有删除的选中项哦~");
        } else {
            deletePants(pantsIds).then(() => {
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
        <div className="pants-container">
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
                        popupType={() => isEditing ? Operate.Edit : Operate.Add}
                        addFunc={(data: ClothesPopupData) => handleAdd(data)}
                        editFunc={(data: ClothesPopupData) => handleEdit(data)}
                    />
                </Card>
            </div>
            <div className="pants">
                <Card
                    style={{
                        display: _.isEmpty(pantsList) ? "none" : "block",
                    }}
                >
                    <Row className="pants-list" gutter={20}>
                        {pantsList.map((pants: PantsList) => (
                            <Col
                                className="pants-single"
                                key={pants.id}
                                span={6}
                            >
                                <div className="hover-visible-container">
                                    <Image
                                        src={`${ROOT}/${pants.pic}`}
                                        title={`价格：${pants.price}\n季节：${
                                            Claire.quarterMap[pants.quarter]
                                        }\n添加日期：${getFormatDate(
                                            `${pants.date}`
                                        )}`}
                                    />
                                    <div className="pants-tools hover-visible-item">
                                        <Button
                                            shape="circle"
                                            type="primary"
                                            className="error-icon"
                                            icon={<DeleteOutlined />}
                                            onClick={() => {
                                                handleDelete([
                                                    {
                                                        id: pants.id,
                                                        src: pants.pic,
                                                    },
                                                ]);
                                            }}
                                        />
                                        <Button
                                            shape="circle"
                                            type="primary"
                                            icon={<EditOutlined />}
                                            onClick={() => {
                                                isEditing = true;
                                                const { id, pic, price, quarter } = pants;
                                                // @ts-ignore
                                                modelRef.current.open({
                                                    id,
                                                    url: pic,
                                                    price,
                                                    quarter,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <Row justify="end" className="pants-pager">
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
                        display: _.isEmpty(pantsList) ? "block" : "none",
                    }}
                >
                    <p className="tip">主人，请上传裤子哦~</p>
                </Card>
            </div>
        </div>
    );
}
