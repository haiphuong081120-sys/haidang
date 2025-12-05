import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ThemeSettingsTab = () => {
    const { settings, setSettings } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6 p-6">
             <Card>
                <CardHeader>
                    <CardTitle>Tùy chỉnh màu sắc</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="primaryColor">Màu chính</Label>
                        <div className="flex gap-2">
                            <Input id="primaryColor" name="primaryColor" type="color" value={settings.primaryColor} onChange={handleChange} className="w-12 h-10 p-1" />
                            <Input value={settings.primaryColor} onChange={handleChange} name="primaryColor" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="secondaryColor">Màu phụ</Label>
                         <div className="flex gap-2">
                            <Input id="secondaryColor" name="secondaryColor" type="color" value={settings.secondaryColor} onChange={handleChange} className="w-12 h-10 p-1" />
                            <Input value={settings.secondaryColor} onChange={handleChange} name="secondaryColor" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ThemeSettingsTab;