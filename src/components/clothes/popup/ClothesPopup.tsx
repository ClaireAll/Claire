import { forwardRef, useImperativeHandle, useState } from "react";
import { Operate, Quarter, Status } from "@enum";
import { Form, Modal, Image, InputNumber, Radio } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { ROOT, deleteOnePic } from "@api";
import _ from "lodash";
import { PlusOutlined } from "@ant-design/icons";

export interface ClothesPopupData {
    url: string;
    price: number;
    quarter: Quarter;
}

let ClothesPopup = (props: any, ref: any) => {
    const { addFunc, popupType } = props;
    const [price, setPrice] = useState(0);
    const [url, setUrl] = useState(""); // 图片名称
    const [quarter, setQuarter] = useState(Quarter.Spring);
    const [showModel, setShowModel] = useState(false);

    useImperativeHandle(ref, () => ({
        open: (data: ClothesPopupData) => {
            const { url, price, quarter } = data;

            setUrl(url);
            setPrice(price);
            setQuarter(quarter);
            setShowModel(true);
        },
    }));

    const deletePic = () => {
        !_.isEmpty(url) && deleteOnePic(url);
    };

    const handleUpload = (info: any) => {
        const { file } = info || {};
        if (file.status === Status.Done) {
            deletePic();
            setUrl(file.response.data.name);
        }
    };

    const handleRemove = (info: any) => {
        if (info.status === Status.Done) {
            deletePic();
            setUrl("");
        }
    };

    return (
        <Modal
            title="添加"
            className="add-container"
            open={showModel}
            onCancel={() => setShowModel(false)}
            onOk={() => {
                popupType === Operate.Add && addFunc({ url: url, price, quarter });
                setShowModel(false);
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
                        showUploadList={!_.isEmpty(url)}
                        onChange={(info) => {
                            handleUpload(info);
                        }}
                        onRemove={(info) => {
                            handleRemove(info);
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
                                display: _.isEmpty(url) ? "none" : "block",
                            }}
                            src={`${ROOT}/${url}`}
                        />
                        <PlusOutlined
                            className="tip"
                            style={{
                                position: "absolute",
                                top: "10px",
                                left: "35px",
                                fontSize: "30px",
                                display: _.isEmpty(url) ? "block" : "none",
                            }}
                        />
                        <p
                            style={{
                                position: "absolute",
                                top: "40px",
                                padding: "0 10px",
                                display: _.isEmpty(url) ? "block" : "none",
                            }}
                            className="tip"
                        >
                            点击或拖拽以上传图片
                        </p>
                    </Dragger>
                </Form.Item>
                <Form.Item label="价格">
                    <InputNumber
                        value={price}
                        onChange={(v) => {
                            setPrice(v as number);
                        }}
                    />
                </Form.Item>
                <Form.Item label="季节">
                    <Radio.Group
                        onChange={(e) => setQuarter(e.target.value)}
                        value={quarter}
                    >
                        <Radio.Button value={Quarter.Spring}>春</Radio.Button>
                        <Radio.Button value={Quarter.Summer}>夏</Radio.Button>
                        <Radio.Button value={Quarter.Autumn}>秋</Radio.Button>
                        <Radio.Button value={Quarter.Winter}>冬</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
}

// @ts-ignore
ClothesPopup = forwardRef(ClothesPopup);
export default ClothesPopup;
