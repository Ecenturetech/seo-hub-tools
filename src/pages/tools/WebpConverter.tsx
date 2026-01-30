import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, Upload, Download } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { SEO } from '@/components/SEO';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function WebpConverter() {
  const { t } = useTranslation();
  const [quality, setQuality] = useState([80]);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [convertedSize, setConvertedSize] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const convertToWebP = useCallback((file: File, qualityValue: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setConvertedBlob(blob);
                setConvertedSize(blob.size);
                setPreview(URL.createObjectURL(blob));
              }
            },
            'image/webp',
            qualityValue / 100
          );
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    setOriginalFile(file);
    setOriginalSize(file.size);
    convertToWebP(file, quality[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value);
    if (originalFile) {
      convertToWebP(originalFile, value[0]);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !originalFile) return;
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = originalFile.name.replace(/\.[^/.]+$/, '.webp');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const savings = originalSize > 0 ? ((1 - convertedSize / originalSize) * 100).toFixed(1) : 0;

  return (
    <>
      <SEO
        titleKey="tools.webpConverter.metaTitle"
        descriptionKey="tools.webpConverter.metaDescription"
      />
      <ToolLayout
        title={t('tools.webpConverter.name')}
        description={t('tools.webpConverter.description')}
        icon={ImageIcon}
      >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              'border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer',
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-accent/50'
            )}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm font-medium">{t('tools.webpConverter.dropzone')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('tools.webpConverter.formats')}</p>
          </div>

          {/* Quality slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>{t('tools.webpConverter.quality')}</Label>
              <span className="text-sm font-medium text-primary">{quality[0]}%</span>
            </div>
            <Slider
              value={quality}
              onValueChange={handleQualityChange}
              min={10}
              max={100}
              step={5}
              className="cursor-pointer"
            />
          </div>

          {/* Stats */}
          {originalSize > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-lg font-bold">{formatBytes(originalSize)}</div>
                <div className="text-xs text-muted-foreground">{t('tools.webpConverter.originalSize')}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-lg font-bold text-primary">{formatBytes(convertedSize)}</div>
                <div className="text-xs text-muted-foreground">{t('tools.webpConverter.convertedSize')}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-lg font-bold text-success">{savings}%</div>
                <div className="text-xs text-muted-foreground">{t('tools.webpConverter.savings')}</div>
              </Card>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>{t('common.preview')}</Label>
            {convertedBlob && (
              <Button variant="default" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                {t('common.download')} WebP
              </Button>
            )}
          </div>
          <Card className="aspect-video flex items-center justify-center overflow-hidden bg-muted/30">
            {preview ? (
              <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="text-muted-foreground text-sm">
                <ImageIcon className="h-16 w-16 mx-auto mb-2 opacity-20" />
                {t('common.preview')}
              </div>
            )}
          </Card>
        </div>
      </div>
      </ToolLayout>
    </>
  );
}
