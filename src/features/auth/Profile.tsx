import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUser } from './authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { showToast } from '@/components/ui/Toast';
import { User, Mail, Edit2, Save, X } from 'lucide-react';

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || '',
  });

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
    showToast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card padding="lg">
        <div className="flex items-center gap-6 mb-6">
          <Avatar
            src={user.image}
            name={`${user.firstName} ${user.lastName}`}
            size="xl"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          {!isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              leftIcon={<Edit2 className="w-4 h-4" />}
            >
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={handleSave}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={handleCancel}
                leftIcon={<X className="w-4 h-4" />}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            leftIcon={<Mail className="w-4 h-4" />}
          />
        </div>
      </Card>
    </div>
  );
};