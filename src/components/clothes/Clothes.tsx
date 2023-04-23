import { Card, Col, Row, Image, Button, message } from "antd";
import "./clothes.less";
import { ROOT, addClothes, getClothesList } from "../../api";
import { Component } from "react";
import { Claire, Quarter } from "../../common/enum";
import _ from "lodash";
import ClothesPopup, { ClothesPopupState } from "./popup/ClothesPopup";

interface ClothesList {
    id: string;
    pic: string;
    price: number;
    color: number;
}

interface StateList {
    clothesList: ClothesList[];
    query: {
        price: {
            min?: number;
            max?: number;
        };
        addDate: {
            min?: string;
            max?: string;
        };
        quarters: Quarter[];
        page: number;
        pageSize: number;
    };
}

class Clothes extends Component<any, StateList> {
    constructor(props: any) {
        super(props);
        this.state = {
            clothesList: [],
            query: {
                price: {},
                addDate: {},
                quarters: [],
                page: 1,
                pageSize: Claire.pageSize,
            },
        };
    }

    private popup!: ClothesPopup;

    componentDidMount() {
        this.getList();
    }

    getList() {
        getClothesList(this.state.query).then((res: any) => {
            this.setState({ clothesList: res.data });
        });
    }

    handleAdd(data: ClothesPopupState) {
        if (_.isEmpty(data.uploadImgSrc)) {
            message.warning("主人，请上传一张图片哦~");
        } else {
            const { uploadImgSrc, price, quarter } = data;
            const query = {
                pic: uploadImgSrc,
                price,
                quarter,
            };
            addClothes(query).then((res: any) => {
                message.success("添加成功~");
                this.getList();
            });
        }
    }

    render() {
        return (
            <div className="clothes-container">
                <div className="filter">
                    <Card>
                        筛选
                        <Button
                            type="primary"
                            onClick={() => {
                                this.popup.open(
                                    {
                                        url: "",
                                        price: "",
                                        quarter: Quarter.Spring,
                                    },
                                    (data: ClothesPopupState) => this.handleAdd(data)
                                );
                            }}
                        >
                            添加
                        </Button>
                        <ClothesPopup ref={(ref) => (this.popup = ref!)} />
                    </Card>
                </div>
                <div className="clothes">
                    <Card>
                        <Row justify="space-around" gutter={20}>
                            {this.state.clothesList.map((clothes) => (
                                <Col
                                    className="clothes-single"
                                    key={clothes.id}
                                    span={6}
                                >
                                    <Image src={`${ROOT}/${clothes.pic}`} />
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Clothes;
