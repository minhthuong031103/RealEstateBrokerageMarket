"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  cn,
  regexPasswordNumber,
  regexPasswordSpecial,
  regexPasswordUpperCase,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileDialog } from "@/components/ui/FileDialog";
import { postRequest } from "@/lib/fetch";
import { Card, CardBody, Checkbox, Chip } from "@nextui-org/react";
import { Zoom } from "@/components/ui/zoom-image";

//quan ly form: react-hook-form
//validate form: zod

const formSchema = z
  .object({
    password: z
      .string()
      .min(1, {
        message: "Vui lòng nhập mật khẩu",
      })
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .regex(regexPasswordSpecial, {
        message: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt",
      })
      .regex(regexPasswordNumber, {
        message: "Mật khẩu phải có ít nhất 1 chữ số",
      })
      .regex(regexPasswordUpperCase, {
        message: "Mật khẩu phải có ít nhất 1 chữ hoa",
      }),
    email: z
      .string()
      .min(1, {
        message: "Vui lòng nhập email",
      })
      .email({ message: "Email không hợp lệ" }),
    confirmPassword: z.string().min(1, {
      message: "Vui lòng nhập lại mật khẩu",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });
const Register = ({
  className,
  payload,
}: {
  className?: string;
  payload: any;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: payload.email || "",
      password: "",
      confirmPassword: "",
    },
  });
  const { onRegister } = useAuth();
  const [name, setName] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [cmndMatTruoc, setCmndMatTruoc] = useState([]);
  const [maSoCmnd, setMaSoCmnd] = useState("");
  console.log("🚀 ~ file: Register.tsx:85 ~ cmndMatTruoc:", cmndMatTruoc);
  const [cmndMatSau, setCmndMatSau] = useState([]);
  const [portrait, setPortrait] = useState([]);
  useEffect(() => {
    if (payload?.email && payload?.name) {
      toast.error("Tài khoản của bạn chưa được đăng ký, vui lòng đăng ký");
    }
  }, []);
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getOcr = async () => {
      try {
        if (cmndMatTruoc?.[0]) {
          const formData = new FormData();
          formData.append("image", cmndMatTruoc[0]);
          const res = await postRequest({
            endPoint: "https://api.fpt.ai/vision/idr/vnm",
            formData: formData,
            isFormData: true,
            customHeaders: {
              "api-key": "wHLMat4wv3zPgFqXHU1abvGSEaHz9Qi3",
            },
          });
          if (res?.errorCode == 0 && res?.data?.[0]) {
            setMaSoCmnd(res?.data?.[0]?.id);
            setName(res?.data[0]?.name);
          } else {
            toast.error("Không thể nhận dạng CMND mặt trước");
          }
        }
      } catch (e) {
        toast.error("Không thể nhận dạng CMND mặt trước");
      }
    };
    getOcr();
  }, [cmndMatTruoc]);

  async function onSubmit(data) {
    if (!name || name === "") {
      toast.error("Vui lòng nhập họ tên");
    }
    if (!cmndMatTruoc?.length || !cmndMatSau?.length) {
      toast.error("Vui lòng tải lên ảnh CMND mặt trước và mặt sau");
      return;
    }
    if (!portrait?.length) {
      toast.error("Vui lòng tải lên ảnh chân dung chủ căn cước");
      return;
    }
    if (!maSoCmnd) {
      toast.error("Vui lòng nhập mã số CMND");
      return;
    }
    if (!isSelected) {
      toast.error(
        "Vui lòng đọc điều khoản chính sách ở trang chủ và chấp thuận với chính sách của chúng tôi"
      );
    }
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append cmndMatTruoc and cmndMatSau to the formData
    formData.append("cmndMatTruoc", cmndMatTruoc[0]);
    formData.append("cmndMatSau", cmndMatSau[0]);
    formData.append("anhChanDung", portrait[0]);
    formData.append("maSoCmnd", maSoCmnd);
    formData.append("name", name);
    setIsLoading(true);
    onRegister(formData, () => {
      setIsLoading(false);
    });
  }
  if (isLoading)
    return (
      <div className="w-full flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={cn("grid gap-6 w-[80%] md:w-[70%] lg:w-[60%] ", className)}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="gap-8 flex flex-col">
                <div className="flex flex-col gap-3 ">
                  <Label>Email</Label>
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Nhập Email của bạn"
                            autoComplete="username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3 ">
                  <Label>Mật khẩu</Label>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Nhập mật khẩu"
                              type={show.password ? "text" : "password"}
                              value={field.value}
                              onChange={field.onChange}
                              renderRight={
                                <div
                                  onClick={() => {
                                    setShow({
                                      ...show,
                                      password: !show.password,
                                    });
                                  }}
                                  className="opacity-50 cursor-pointer hover:opacity-100"
                                >
                                  {show.password ? (
                                    <AiFillEyeInvisible size={20} />
                                  ) : (
                                    <AiFillEye size={20} />
                                  )}
                                </div>
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3 ">
                  <Label>Mật khẩu xác nhận</Label>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Xác nhận mật khẩu"
                              type={show.confirmPassword ? "text" : "password"}
                              value={field.value}
                              onChange={field.onChange}
                              renderRight={
                                <div
                                  onClick={() => {
                                    setShow({
                                      ...show,
                                      confirmPassword: !show.confirmPassword,
                                    });
                                  }}
                                  className="opacity-50 cursor-pointer hover:opacity-100"
                                >
                                  {show.confirmPassword ? (
                                    <AiFillEyeInvisible size={20} />
                                  ) : (
                                    <AiFillEye size={20} />
                                  )}
                                </div>
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3 ">
                  <Card>
                    <CardBody>
                      <Chip className="bg-red-400 text-slate-900">
                        Quy định:
                      </Chip>
                      <p className="text-[12px] ">
                        - Ảnh đầu vào phải đủ 4 góc rõ ràng hoặc đủ các bộ phận
                        chính của một CMT như ảnh, quốc huy, tiêu đề.
                      </p>
                      <p className="text-[12px]">
                        - Các trường thông tin phải rõ ràng, so sánh khi mắt
                        người có thể đọc được dễ dàng, không tẩy xoá, hay bị
                        nhoè xước. Số CCCD và họ tên sẽ được điền tự động sau
                        khi tải hình.
                      </p>
                    </CardBody>
                  </Card>
                  <div className="flex flex-col gap-3 ">
                    <Label>Mã số CMND</Label>

                    <Input
                      type="text"
                      placeholder="Nhập mã số CMND"
                      value={maSoCmnd}
                      onChange={(e) => setMaSoCmnd(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-3 ">
                    <Label>Họ và tên đại diện</Label>

                    <Input
                      type="text"
                      placeholder="Nhập họ tên đại diện"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-3 ">
                    <Label>Ảnh chân dung</Label>
                    <div className="  w-full flex justify-center h-36">
                      <Zoom key={1} className={"w-full"}>
                        <img
                          src={portrait[0]?.preview}
                          alt={portrait[0]?.name}
                          className={` w-28 h-36  border-2 rounded-md object-cover object-center`}
                        />
                      </Zoom>
                    </div>
                    <div className="flex w-full justify-center">
                      <FileDialog
                        className="w-32"
                        name="phapLyImages"
                        maxFiles={1}
                        maxSize={1024 * 1024 * 4}
                        files={portrait}
                        setFiles={setPortrait}
                        disabled={false}
                      />
                    </div>
                  </div>
                  <Label>Ảnh CMND mặt trước</Label>

                  <div className=" flex justify-center h-36">
                    <Zoom key={2} className={"w-full "}>
                      <img
                        src={cmndMatTruoc[0]?.preview}
                        alt={cmndMatTruoc[0]?.name}
                        className={`h-36 w-56  border-2 rounded-md object-cover object-center`}
                      />
                    </Zoom>
                  </div>
                  <div className="flex w-full justify-center">
                    <FileDialog
                      className="w-56"
                      name="phapLyImages"
                      maxFiles={1}
                      maxSize={1024 * 1024 * 4}
                      files={cmndMatTruoc}
                      setFiles={setCmndMatTruoc}
                      disabled={false}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 ">
                  <Label>Ảnh CMND mặt sau</Label>
                  <div className=" flex justify-center h-36 ">
                    <Zoom key={2} className={"w-full "}>
                      <img
                        src={cmndMatSau[0]?.preview}
                        alt={cmndMatSau[0]?.name}
                        className={`h-36 w-56  border-2 rounded-md object-cover object-center`}
                      />
                    </Zoom>
                  </div>
                  <div className="flex w-full justify-center">
                    <FileDialog
                      className="w-56"
                      name="phapLyImages"
                      maxFiles={1}
                      maxSize={1024 * 1024 * 4}
                      files={cmndMatSau}
                      setFiles={setCmndMatSau}
                      disabled={false}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Checkbox
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                  >
                    <p className="text-sm">
                      Đồng ý với chính sách của văn phòng
                    </p>
                  </Checkbox>
                </div>
              </div>

              <Button type="submit" className="">
                Đăng ký
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <p className=" mt-10 text-center text-sm text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link className=" font-bold underline text-black" href="/auth/login">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default Register;
