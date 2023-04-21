import { Card, Col, Row, Image, Button, Modal, Form } from "antd";
import "./clothes.less";
import { ROOT, claireGet } from "../../api";
import { Component } from "react";
import Dragger from "antd/es/upload/Dragger";

interface ClothesList {
    id: string;
    pic: string;
    price: number;
    color: number;
}

interface StateList {
    clothesList: ClothesList[];
    showAddModal: boolean;
}

class Clothes extends Component<any, StateList> {
    constructor(props: any) {
        super(props);
        this.state = {
            clothesList: [],
            showAddModal: false,
        };
    }

    componentDidMount() {
        claireGet("/clothes/list").then((res: any) => {
            this.setState({ clothesList: res.data });
        });
    }

    setShowAddModal(show: boolean): void {
        this.setState({ showAddModal: show });
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
                                this.setShowAddModal(true);
                            }}
                        >
                            添加
                        </Button>
                        <Modal
                            title="添加"
                            open={this.state.showAddModal}
                            onCancel={() => this.setShowAddModal(false)}
                        >
                            <Form>
                                <Form.Item
                                    label="图片"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请上传图片",
                                        },
                                    ]}
                                >
                                    <Dragger
                                        accept="image/*"
                                        name="file"
                                        multiple={false}
                                        action={`${ROOT}/upload`}
                                        onChange={(info) => {
                                            console.log(info);
                                        }}
                                        onDrop={(info) => {
                                            console.log(info);
                                        }}
                                    >
                                        点击或拖拽以上传图片
                                    </Dragger>
                                </Form.Item>
                            </Form>
                        </Modal>
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
                                    <Image src={clothes.pic} />
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
