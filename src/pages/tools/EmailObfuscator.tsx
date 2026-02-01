import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Mail, Copy, Check } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

export default function EmailObfuscator() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { lang } = useParams<{ lang: string }>();
  const [email, setEmail, clearEmail] = useLocalStorage(`email-obfuscator_${lang || 'en'}`, '');
  const [copied, setCopied] = useState<string | null>(null);

  const obfuscations = useMemo(() => {
    if (!email || !email.includes('@')) return null;

    // HTML Entities
    const htmlEntities = email
      .split('')
      .map((char) => `&#${char.charCodeAt(0)};`)
      .join('');

    // JavaScript document.write
    const jsDocWrite = `<script>document.write('${email
      .split('')
      .map((char) => `\\x${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join('')}');<\/script>`;

    // CSS + HTML method
    const [localPart, domain] = email.split('@');
    const cssHtml = `<span style="unicode-bidi:bidi-override;direction:rtl;">${email
      .split('')
      .reverse()
      .join('')}</span>`;

    // Base64 encoded with JS decoder
    const base64Email = btoa(email);
    const base64Method = `<script>document.write(atob('${base64Email}'));<\/script>`;

    // Mailto with encoded
    const mailtoEncoded = `<a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;${htmlEntities}">${htmlEntities}</a>`;

    // ROT13 method
    const rot13 = email.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
    });
    const rot13Method = `<!-- ROT13: ${rot13} -->\n<script>document.write('${rot13}'.replace(/[a-zA-Z]/g,c=>String.fromCharCode((c<='Z'?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26)));<\/script>`;

    return {
      htmlEntities,
      jsDocWrite,
      cssHtml,
      base64Method,
      mailtoEncoded,
      rot13Method,
    };
  }, [email]);

  const copyToClipboard = async (text: string, method: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(method);
    setTimeout(() => setCopied(null), 2000);
    toast({
      title: t('common.copied'),
      description: t('tools.emailObfuscator.copiedDescription'),
    });
  };

  const renderCodeBlock = (code: string, method: string, label: string) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(code, method)}
        >
          {copied === method ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <>
      <SEO
        titleKey="tools.emailObfuscator.metaTitle"
        descriptionKey="tools.emailObfuscator.metaDescription"
      />
      <ToolLayout
        title={t('tools.emailObfuscator.name')}
        description={t('tools.emailObfuscator.description')}
        icon={Mail}
        toolKey="emailObfuscator"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={clearEmail} />
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="email" className="mb-2 block">
              {t('tools.emailObfuscator.inputLabel')}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('tools.emailObfuscator.placeholder')}
              className="input-highlight max-w-md"
            />
          </div>

          {obfuscations && (
            <Card className="p-4">
              <Tabs defaultValue="html" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="js">JavaScript</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="base64">Base64</TabsTrigger>
                  <TabsTrigger value="mailto">Mailto</TabsTrigger>
                  <TabsTrigger value="rot13">ROT13</TabsTrigger>
                </TabsList>

                <TabsContent value="html" className="mt-4">
                  {renderCodeBlock(
                    obfuscations.htmlEntities,
                    'html',
                    t('tools.emailObfuscator.methods.html')
                  )}
                </TabsContent>

                <TabsContent value="js" className="mt-4">
                  {renderCodeBlock(
                    obfuscations.jsDocWrite,
                    'js',
                    t('tools.emailObfuscator.methods.js')
                  )}
                </TabsContent>

                <TabsContent value="css" className="mt-4">
                  {renderCodeBlock(
                    obfuscations.cssHtml,
                    'css',
                    t('tools.emailObfuscator.methods.css')
                  )}
                </TabsContent>

                <TabsContent value="base64" className="mt-4">
                  {renderCodeBlock(
                    obfuscations.base64Method,
                    'base64',
                    t('tools.emailObfuscator.methods.base64')
                  )}
                </TabsContent>

                <TabsContent value="mailto" className="mt-4">
                  {renderCodeBlock(
                    obfuscations.mailtoEncoded,
                    'mailto',
                    t('tools.emailObfuscator.methods.mailto')
                  )}
                </TabsContent>

                <TabsContent value="rot13" className="mt-4">
                  {renderCodeBlock(
                    obfuscations.rot13Method,
                    'rot13',
                    t('tools.emailObfuscator.methods.rot13')
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          )}

          {!obfuscations && email && (
            <p className="text-muted-foreground text-center py-4">
              {t('tools.emailObfuscator.invalidEmail')}
            </p>
          )}
        </div>

      </ToolLayout>
    </>
  );
}
