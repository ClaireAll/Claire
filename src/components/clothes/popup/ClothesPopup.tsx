import { Form, Modal, Image, InputNumber, Radio } from "antd";
import { Component, ReactNode } from "react";
import { ROOT, deleteOnePic } from "../../../api";
import _ from "lodash";
import { Quarter, Status } from "../../../common/enum";
import Dragger from "antd/es/upload/Dragger";
import { PlusOutlined } from "@ant-design/icons";

export interface ClothesPopupState {
    price: number;
    uploadImgSrc: string;
    quarter: Quarter;
    showAddModal: boolean;
    save: Function;
}

class ClothesPopup extends Component<any, ClothesPopupState> {
    constructor(props: any) {
        super(props);
        this.state = {
            price: 0,
            uploadImgSrc: "",
            quarter: Quarter.Spring,
            showAddModal: false,
            save: () => {},
        };
    }

    setShowAddModal(show: boolean) {
        this.setState({ showAddModal: show, uploadImgSrc: "" });
    }

    handleUpload(info: any) {
        const { file } = info;
        if (file.status === Status.Done) {
            this.deletePic();
            this.setState({
                uploadImgSrc: file.response.data.name,
            });
        }
    }

    handleRemove(info: any) {
        if (info.status === Status.Done) {
            this.deletePic();
            this.setState({
                uploadImgSrc: "",
            });
        }
    }

    deletePic() {
        !_.isEmpty(this.state.uploadImgSrc) &&
            deleteOnePic(this.state.uploadImgSrc);
    }

    render(): ReactNode {
        return (
            <Modal
                title="添加"
                className="add-container"
                open={this.state.showAddModal}
                onCancel={() => this.setShowAddModal(false)}
                onOk={() => {
                    this.state.save(this.state);
                    this.setShowAddModal(false);
                }}
            >
                <Form labelAlign="left" labelCol={{ span: 4 }}>
                    <Form.Item
                        label="图片"
                        required
                        rules={[
                            {
                                required: true,
                                message: "请上传图片",
                            },
                        ]}
                    >
                        <Dragger
                            className="img-uploader"
                            accept="image/*"
                            name="file"
                            multiple={false}
                            maxCount={1}
                            action={`${ROOT}/upload`}
                            showUploadList={!_.isEmpty(this.state.uploadImgSrc)}
                            onChange={(info) => {
                                this.handleUpload(info);
                            }}
                            onDrop={(info) => {
                                this.handleUpload(info);
                            }}
                            onRemove={(info) => {
                                this.handleRemove(info);
                            }}
                        >
                            <Image
                                preview={false}
                                width={100}
                                height={100}
                                style={{
                                    position: "absolute",
                                    top: "-17px",
                                    left: "-1px",
                                    borderRadius: "10px",
                                    display: _.isEmpty(this.state.uploadImgSrc)
                                        ? "none"
                                        : "block",
                                }}
                                src={`${ROOT}/${this.state.uploadImgSrc}`}
                            />
                            <PlusOutlined
                                className="tip"
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    left: "35px",
                                    fontSize: "30px",
                                    display: _.isEmpty(this.state.uploadImgSrc)
                                        ? "block"
                                        : "none",
                                }}
                            />
                            <p
                                style={{
                                    position: "absolute",
                                    top: "40px",
                                    padding: "0 10px",
                                    display: _.isEmpty(this.state.uploadImgSrc)
                                        ? "block"
                                        : "none",
                                }}
                                className="tip"
                            >
                                点击或拖拽以上传图片
                            </p>
                        </Dragger>
                    </Form.Item>
                    <Form.Item label="价格">
                        <InputNumber
                            value={this.state.price}
                            onChange={(v) => {
                                this.setState({ price: v as number });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="季节">
                        <Radio.Group
                            onChange={(e) =>
                                this.setState({
                                    quarter: e.target.value,
                                })
                            }
                            value={this.state.quarter}
                        >
                            <Radio.Button value={Quarter.Spring}>
                                春
                            </Radio.Button>
                            <Radio.Button value={Quarter.Summer}>
                                夏
                            </Radio.Button>
                            <Radio.Button value={Quarter.Autumn}>
                                秋
                            </Radio.Button>
                            <Radio.Button value={Quarter.Winter}>
                                冬
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    getValue() {
        return this.state;
    }

    open(data: any, operate: Function) {
        const { url, price, quarter } = data;
        this.setState({
            uploadImgSrc: url,
            price,
            quarter,
            showAddModal: true,
            save: operate,
        });
    }
}

export default ClothesPopup;
