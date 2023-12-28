import { Button, Divider, Form, Input, message, Upload } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";

const RegisterPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        if (file == null) {
            message.error("Оберіть фото!");
            return;
        }

        const model = {
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phone: values.phone,
            image: file,
        };

        try {
            // Adjust the API endpoint and request payload accordingly
            await axios.post("http://pv116.rozetka.com/api/register", model, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/");
        } catch (ex) {

            message.error("Помилка реєстрації користувача!");
        }
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.log("Error Form data", errorInfo);
    };

    type FieldType = {
        name?: string;
        lastName?: string;
        email?: string;
        password?: string;
        phone?: string;
    };

    const beforeUpload = (file: RcFile) => {
        const isImage = /^image\/\w+/.test(file.type);
        if (!isImage) {
            message.error("Оберіть файл зображення!");
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error("Розмір файлу не повинен перевищувать 10MB!");
        }
        console.log("is select", isImage && isLt2M);
        return isImage && isLt2M;
    };

    const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
        const file = info.file.originFileObj as File;
        setFile(file);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Divider>Реєстрація користувача</Divider>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFailed}
            >
                <Form.Item<FieldType>
                    label="Ім'я"
                    name="name"
                    rules={[{ required: true, message: "Вкажіть ім'я!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Прізвище"
                    name="lastName"
                    rules={[{ required: true, message: 'Вкажіть прізвище!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Електронна пошта"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Вкажіть електронну пошту!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Вкажіть пароль!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Телефон"
                    name="phone"
                    rules={[{ required: true, message: 'Вкажіть телефон!' }]}
                >
                    <Input />
                </Form.Item>

                <div>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="#"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        accept={"image/*"}
                    >
                        {file ? <img src={URL.createObjectURL(file)} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </div>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Зареєструвати
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default RegisterPage;