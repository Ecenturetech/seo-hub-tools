import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Send, ArrowLeft, Github, Twitter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const mailtoLink = `mailto:contact@seolayer.studio?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t('contact.successTitle'),
        description: t('contact.successMessage'),
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.metaTitle')}</title>
        <meta name="description" content={t('contact.metaDescription')} />
      </Helmet>

      <div className="min-h-screen">
        <article className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          {/* Back button */}
          <Link to={`/${lang || 'en'}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            {t('common.backToHome')}
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {t('contact.title')}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {t('contact.subtitle')}
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <section>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">{t('contact.formTitle')}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t('contact.nameLabel')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">{t('contact.emailLabel')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">{t('contact.subjectLabel')}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t('contact.subjectPlaceholder')}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{t('contact.messageLabel')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.messagePlaceholder')}
                      required
                      rows={5}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="animate-spin mr-2">⟳</span>
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {t('contact.submitButton')}
                  </Button>
                </form>
              </Card>
            </section>

            {/* Contact Info */}
            <section className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t('contact.directContact')}</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('contact.emailTitle')}</p>
                      <a 
                        href="mailto:contact@seolayer.studio" 
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        contact@seolayer.studio
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t('contact.followUs')}</h2>
                
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/seolayer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://twitter.com/seolayer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold mb-2">{t('contact.responseTime')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('contact.responseTimeText')}
                </p>
              </Card>
            </section>
          </div>

          {/* About Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">{t('contact.aboutTitle')}</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t('contact.aboutText1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('contact.aboutText2')}
              </p>
            </div>
          </section>
        </article>

        {/* Footer */}
        <footer className="border-t py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 SeoLayer Studio
              </p>
              <div className="flex items-center gap-6">
                <Link to={`/${lang || 'en'}/about`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.about')}
                </Link>
                <Link to={`/${lang || 'en'}/privacy`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.privacy')}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
