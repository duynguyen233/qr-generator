/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColorPicker } from "@/components/ColorPicker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Download, MapPin, Upload, X } from "lucide-react";
import QRCodeStyling, {
  type CornerDotType,
  type CornerSquareType,
  type DotType,
  type ErrorCorrectionLevel,
  type FileExtension,
  type Mode,
  type Options,
  type TypeNumber,
} from "qr-code-styling";
import { useEffect, useRef, useState } from "react";

export default function QRGeneratorPage() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState("300");
  const [fileExt, setFileExt] = useState<FileExtension>("png");
  const [imageFile, setImageFile] = useState<string>("");
  const [imageSize, setImageSize] = useState("0.4");
  const [hideBackgroundDots, setHideBackgroundDots] = useState(true);

  // QR Options
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<ErrorCorrectionLevel>("Q");
  const [margin, setMargin] = useState("10");

  // Colors
  const [dotsColor, setDotsColor] = useState("#222222");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [cornersSquareColor, setCornersSquareColor] = useState("#222222");
  const [cornersDotColor, setCornersDotColor] = useState("#222222");

  // Styles
  const [dotsType, setDotsType] = useState<DotType>("square");
  const [cornersSquareType, setCornersSquareType] =
    useState<CornerSquareType>("square");
  const [cornersDotType, setCornersDotType] = useState<CornerDotType>("square");

  const [qrCode] = useState<QRCodeStyling>(
    new QRCodeStyling({
      width: 300,
      height: 300,
      data: "https://example.com",
      margin: 10,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: "anonymous",
      },
      dotsOptions: {
        color: "#222222",
        type: "rounded" as DotType,
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        color: "#222222",
        type: "extra-rounded" as CornerSquareType,
      },
      cornersDotOptions: {
        color: "#222222",
        type: "dot" as CornerDotType,
      },
    })
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  useEffect(() => {
    const options: Options = {
      width: parseInt(size) || 300,
      height: parseInt(size) || 300,
      data: text,
      margin: parseInt(margin) || 10,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: errorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: hideBackgroundDots,
        imageSize: parseFloat(imageSize) || 0.4,
        margin: 20,
        crossOrigin: "anonymous",
      },
      dotsOptions: {
        color: dotsColor,
        type: dotsType,
      },
      backgroundOptions: {
        color:
          backgroundColor === "transparent" ? "#ffffff00" : backgroundColor,
      },
      cornersSquareOptions: {
        color: cornersSquareColor,
        type: cornersSquareType,
      },
      cornersDotOptions: {
        color: cornersDotColor,
        type: cornersDotType,
      },
    };

    if (imageFile) {
      options.image = imageFile;
    }
    if (imageFile === "") {
      options.image = undefined;
    }

    qrCode.update(options);
  }, [
    text,
    size,
    margin,
    errorCorrectionLevel,
    dotsColor,
    backgroundColor,
    cornersSquareColor,
    cornersDotColor,
    dotsType,
    cornersSquareType,
    cornersDotType,
    imageFile,
    imageSize,
    hideBackgroundDots,
    qrCode,
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageFile(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile("");
  };

  const downloadQRCode = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Tạo Mã QR Nâng Cao
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Tạo mã QR với đầy đủ tùy chỉnh: màu sắc, hình dạng, logo và nhiều
            hơn nữa
          </p>
        </div>

        {/* Google Maps Guide */}
        <Alert className="mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-900 dark:text-blue-100 font-semibold">
            Hướng dẫn lấy link Google Maps
          </AlertTitle>
          <AlertDescription className="text-blue-800 dark:text-blue-200 mt-2">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Mở <strong>Google Maps</strong> trên trình duyệt hoặc ứng dụng
              </li>
              <li>Tìm kiếm địa điểm hoặc nhấp vào vị trí bạn muốn chia sẻ</li>
              <li>
                Nhấp vào nút <strong>"Chia sẻ"</strong> (Share)
              </li>
              <li>
                Chọn <strong>"Sao chép liên kết"</strong> (Copy link) - bạn sẽ
                nhận được link rút gọn dạng:{" "}
                <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">
                  https://maps.app.goo.gl/xxxxx
                </code>
              </li>
              <li>
                Dán link vào ô <strong>"Văn bản hoặc URL"</strong> bên dưới
              </li>
            </ol>
            <p className="mt-3 text-sm">
              💡 <strong>Mẹo:</strong> Link rút gọn sẽ tạo mã QR gọn gàng và dễ
              quét hơn!
            </p>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Cài Đặt Mã QR</CardTitle>
              <CardDescription>
                Tùy chỉnh mã QR của bạn với tất cả các tùy chọn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Cơ bản</TabsTrigger>
                  <TabsTrigger value="style">Kiểu dáng</TabsTrigger>
                  <TabsTrigger value="colors">Màu sắc</TabsTrigger>
                </TabsList>

                {/* Basic Settings */}
                <TabsContent value="basic" className="space-y-6">
                  {/* Text/URL Input */}
                  <div className="space-y-2">
                    <Label htmlFor="text">Văn bản hoặc URL</Label>
                    <Textarea
                      id="text"
                      placeholder="Nhập văn bản, URL website, hoặc link Google Maps..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Size Input */}
                  <div className="space-y-2">
                    <Label htmlFor="size">Kích thước (px)</Label>
                    <Input
                      id="size"
                      type="number"
                      min="100"
                      max="1000"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>

                  {/* Margin */}
                  <div className="space-y-2">
                    <Label htmlFor="margin">Lề (px)</Label>
                    <Input
                      id="margin"
                      type="number"
                      min="0"
                      max="50"
                      value={margin}
                      onChange={(e) => setMargin(e.target.value)}
                    />
                  </div>

                  {/* Error Correction Level */}
                  <div className="space-y-2">
                    <Label htmlFor="errorLevel">Mức độ sửa lỗi</Label>
                    <Select
                      value={errorCorrectionLevel}
                      onValueChange={(value: any) =>
                        setErrorCorrectionLevel(value)
                      }
                    >
                      <SelectTrigger id="errorLevel">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Thấp (L) - 7%</SelectItem>
                        <SelectItem value="M">Trung bình (M) - 15%</SelectItem>
                        <SelectItem value="Q">Cao (Q) - 25%</SelectItem>
                        <SelectItem value="H">Rất cao (H) - 30%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Logo/Hình ảnh (tùy chọn)</Label>
                    {!imageFile ? (
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="image"
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Nhấp để tải logo lên
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="relative border rounded-lg p-4">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-0 right-0"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <img
                          src={imageFile}
                          alt="Logo"
                          className="max-h-20 mx-auto"
                        />
                      </div>
                    )}
                  </div>

                  {imageFile && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="imageSize">
                          Kích thước logo (0.1 - 0.5)
                        </Label>
                        <Input
                          id="imageSize"
                          type="number"
                          min="0.1"
                          max="0.5"
                          step="0.05"
                          value={imageSize}
                          onChange={(e) => setImageSize(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="hideBackgroundDots"
                          checked={hideBackgroundDots}
                          onChange={(e) =>
                            setHideBackgroundDots(e.target.checked)
                          }
                          className="rounded"
                        />
                        <Label
                          htmlFor="hideBackgroundDots"
                          className="cursor-pointer"
                        >
                          Ẩn các chấm phía sau logo
                        </Label>
                      </div>
                    </>
                  )}
                </TabsContent>

                {/* Style Settings */}
                <TabsContent value="style" className="space-y-6">
                  {/* Dots Type */}
                  <div className="space-y-2">
                    <Label htmlFor="dotsType">Kiểu chấm QR</Label>
                    <Select
                      value={dotsType}
                      onValueChange={(value: any) => setDotsType(value)}
                    >
                      <SelectTrigger id="dotsType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded">Tròn (Rounded)</SelectItem>
                        <SelectItem value="dots">Chấm (Dots)</SelectItem>
                        <SelectItem value="classy">
                          Thanh lịch (Classy)
                        </SelectItem>
                        <SelectItem value="classy-rounded">
                          Thanh lịch tròn (Classy Rounded)
                        </SelectItem>
                        <SelectItem value="square">Vuông (Square)</SelectItem>
                        <SelectItem value="extra-rounded">
                          Rất tròn (Extra Rounded)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Corners Square Type */}
                  <div className="space-y-2">
                    <Label htmlFor="cornersSquareType">Kiểu góc vuông</Label>
                    <Select
                      value={cornersSquareType}
                      onValueChange={(value: any) =>
                        setCornersSquareType(value)
                      }
                    >
                      <SelectTrigger id="cornersSquareType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dot">Chấm (Dot)</SelectItem>
                        <SelectItem value="square">Vuông (Square)</SelectItem>
                        <SelectItem value="extra-rounded">
                          Rất tròn (Extra Rounded)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Corners Dot Type */}
                  <div className="space-y-2">
                    <Label htmlFor="cornersDotType">Kiểu chấm góc</Label>
                    <Select
                      value={cornersDotType}
                      onValueChange={(value: any) => setCornersDotType(value)}
                    >
                      <SelectTrigger id="cornersDotType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dot">Chấm (Dot)</SelectItem>
                        <SelectItem value="square">Vuông (Square)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                {/* Color Settings */}
                <TabsContent value="colors" className="space-y-6">
                  {/* Dots Color */}
                  <ColorPicker
                    label="Màu chấm QR"
                    color={dotsColor}
                    onChange={setDotsColor}
                    allowTransparent={false}
                  />

                  {/* Background Color */}
                  <ColorPicker
                    label="Màu nền"
                    color={backgroundColor}
                    onChange={setBackgroundColor}
                    allowTransparent={true}
                  />

                  {/* Corners Square Color */}
                  <ColorPicker
                    label="Màu góc vuông"
                    color={cornersSquareColor}
                    onChange={setCornersSquareColor}
                    allowTransparent={false}
                  />

                  {/* Corners Dot Color */}
                  <ColorPicker
                    label="Màu chấm góc"
                    color={cornersDotColor}
                    onChange={setCornersDotColor}
                    allowTransparent={false}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Xem trước</CardTitle>
              <CardDescription>
                Mã QR của bạn sẽ xuất hiện ở đây
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div
                  className="p-8 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
                  style={{
                    backgroundColor:
                      backgroundColor === "transparent"
                        ? "transparent"
                        : backgroundColor,
                    backgroundImage:
                      backgroundColor === "transparent"
                        ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                        : "none",
                    backgroundSize:
                      backgroundColor === "transparent" ? "20px 20px" : "auto",
                    backgroundPosition:
                      backgroundColor === "transparent"
                        ? "0 0, 0 10px, 10px -10px, -10px 0px"
                        : "0 0",
                  }}
                >
                  <div ref={ref} />
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                {/* File Format Selection */}
                <div className="space-y-2">
                  <Label htmlFor="fileFormat">Định dạng tải xuống</Label>
                  <Select
                    value={fileExt}
                    onValueChange={(value: any) => setFileExt(value)}
                  >
                    <SelectTrigger id="fileFormat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="svg">SVG</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="webp">WEBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={downloadQRCode} className="w-full" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  Tải xuống mã QR
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Định dạng: {fileExt.toUpperCase()} | Kích thước: {size}x{size}
                  px
                </p>
              </div>

              <div className="w-full space-y-2 pt-4 border-t">
                <h4 className="font-semibold text-sm">Mẹo sử dụng:</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Sử dụng SVG cho chất lượng tốt nhất khi in ấn</p>
                  <p>• PNG/JPEG phù hợp cho web và mạng xã hội</p>
                  <p>• Mức sửa lỗi cao giúp QR dễ quét hơn khi bị hỏng</p>
                  <p>• Logo nên có nền trong suốt (PNG) để đẹp nhất</p>
                  <p>• Kiểm tra QR bằng điện thoại trước khi in</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
