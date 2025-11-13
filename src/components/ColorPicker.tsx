"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  cmykToRgb,
  hexToRgb,
  rgbToCmyk,
  rgbToHex,
  type CMYKColor,
  type RGBColor,
} from "@/lib/colorUtils";
import { useEffect, useState } from "react";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  allowTransparent?: boolean;
}

export function ColorPicker({
  label,
  color,
  onChange,
  allowTransparent = false,
}: ColorPickerProps) {
  const [colorMode, setColorMode] = useState<"rgb" | "cmyk">("rgb");
  const [isTransparent, setIsTransparent] = useState(color === "transparent");

  const currentRgb: RGBColor = isTransparent
    ? { r: 255, g: 255, b: 255 }
    : hexToRgb(color);
  const currentCmyk: CMYKColor = rgbToCmyk(currentRgb);

  useEffect(() => {
    setIsTransparent(color === "transparent");
  }, [color]);

  const handleRgbChange = (channel: keyof RGBColor, value: string) => {
    const numValue = Math.max(0, Math.min(255, parseInt(value) || 0));
    const newRgb = { ...currentRgb, [channel]: numValue };
    onChange(rgbToHex(newRgb));
  };

  const handleCmykChange = (channel: keyof CMYKColor, value: string) => {
    const numValue = Math.max(0, Math.min(100, parseInt(value) || 0));
    const newCmyk = { ...currentCmyk, [channel]: numValue };
    const newRgb = cmykToRgb(newCmyk);
    onChange(rgbToHex(newRgb));
  };

  const handleHexChange = (value: string) => {
    // Allow typing # and hex characters
    if (value.startsWith("#")) {
      onChange(value);
      // Auto-validate when complete
      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        onChange(value);
      }
    } else if (value.length > 0) {
      // Auto-add # if user forgets
      onChange("#" + value);
    }
  };

  const handleColorPickerChange = (value: string) => {
    onChange(value);
  };

  const handleTransparentToggle = () => {
    if (isTransparent) {
      onChange("#ffffff");
      setIsTransparent(false);
    } else {
      onChange("transparent");
      setIsTransparent(true);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex gap-2">
          {allowTransparent && (
            <Button
              type="button"
              variant={isTransparent ? "default" : "outline"}
              size="sm"
              onClick={handleTransparentToggle}
            >
              Trong suốt
            </Button>
          )}
          <Button
            type="button"
            variant={colorMode === "rgb" ? "default" : "outline"}
            size="sm"
            onClick={() => setColorMode("rgb")}
          >
            RGB
          </Button>
          <Button
            type="button"
            variant={colorMode === "cmyk" ? "default" : "outline"}
            size="sm"
            onClick={() => setColorMode("cmyk")}
          >
            CMYK
          </Button>
        </div>
      </div>

      {!isTransparent && (
        <>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorPickerChange(e.target.value)}
              className="w-12 h-12 rounded-md border-2 border-border cursor-pointer hover:ring-2 hover:ring-ring transition-all"
            />
            <div className="flex-1">
              <Input
                type="text"
                value={color}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#000000"
                maxLength={7}
              />
            </div>
          </div>

          {colorMode === "rgb" && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs">R (0-255)</Label>
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={currentRgb.r}
                  onChange={(e) => handleRgbChange("r", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">G (0-255)</Label>
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={currentRgb.g}
                  onChange={(e) => handleRgbChange("g", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">B (0-255)</Label>
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={currentRgb.b}
                  onChange={(e) => handleRgbChange("b", e.target.value)}
                />
              </div>
            </div>
          )}

          {colorMode === "cmyk" && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">C (0-100)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={currentCmyk.c}
                  onChange={(e) => handleCmykChange("c", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">M (0-100)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={currentCmyk.m}
                  onChange={(e) => handleCmykChange("m", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">Y (0-100)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={currentCmyk.y}
                  onChange={(e) => handleCmykChange("y", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">K (0-100)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={currentCmyk.k}
                  onChange={(e) => handleCmykChange("k", e.target.value)}
                />
              </div>
            </div>
          )}
        </>
      )}

      {isTransparent && (
        <div className="p-4 border rounded-md text-center text-muted-foreground">
          Nền trong suốt được chọn
        </div>
      )}
    </div>
  );
}
