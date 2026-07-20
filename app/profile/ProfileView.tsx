'use client';

import { useState, useTransition } from 'react';
import type { Profile } from '@/types/database';
import { updateProfile } from './actions';

function initials(name: string | null, email: string) {
  const source = name?.trim() || email;
  return source.charAt(0).toUpperCase();
}

export default function ProfileView({ profile, email }: { profile: Profile | null; email: string }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await updateProfile(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setEditing(false);
      }
    });
  }

  if (!editing) {
    return (
      <div className="hd-app-card">
        <div className="hd-profile-header">
          {profile?.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar_url} alt="" className="hd-avatar hd-avatar--large" />
          ) : (
            <div className="hd-avatar hd-avatar--large hd-avatar--placeholder">
              {initials(profile?.full_name ?? null, email)}
            </div>
          )}
          <div>
            <p className="hd-app-card-title" style={{ marginBottom: 4 }}>
              {profile?.full_name || 'Unnamed'}
            </p>
            <p className="hd-app-row-meta">{email}</p>
          </div>
        </div>

        {profile?.bio && <p className="hd-app-subtitle" style={{ marginTop: 20 }}>{profile.bio}</p>}

        <div className="hd-app-row">
          <span className="hd-app-row-title">School / Organization</span>
          <span className="hd-app-row-meta">{profile?.school_or_org || 'Not set'}</span>
        </div>
        <div className="hd-app-row">
          <span className="hd-app-row-title">Grade</span>
          <span className="hd-app-row-meta">{profile?.grade || 'Not set'}</span>
        </div>
        <div className="hd-app-row">
          <span className="hd-app-row-title">Role</span>
          <span className="hd-app-status hd-app-status--admin">{profile?.role ?? '—'}</span>
        </div>

        <button type="button" className="ct-btn ct-btn-filled" style={{ marginTop: 20 }} onClick={() => setEditing(true)}>
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">Edit Profile</p>
      {error && <div className="hd-app-banner hd-app-banner--error">{error}</div>}

      <form action={handleSubmit} className="ct-form">
        <div className="ct-field-group">
          <label htmlFor="avatar" className="ct-label">Avatar</label>
          <input id="avatar" name="avatar" type="file" accept="image/*" className="ct-input" />
        </div>
        <div className="ct-field-group">
          <label htmlFor="full_name" className="ct-label">Full Name</label>
          <input id="full_name" name="full_name" defaultValue={profile?.full_name ?? ''} className="ct-input" />
        </div>
        <div className="ct-row-two">
          <div className="ct-field-group">
            <label htmlFor="school_or_org" className="ct-label">School / Organization</label>
            <input
              id="school_or_org"
              name="school_or_org"
              defaultValue={profile?.school_or_org ?? ''}
              className="ct-input"
            />
          </div>
          <div className="ct-field-group">
            <label htmlFor="grade" className="ct-label">Grade</label>
            <input id="grade" name="grade" defaultValue={profile?.grade ?? ''} className="ct-input" />
          </div>
        </div>
        <div className="ct-field-group">
          <label htmlFor="bio" className="ct-label">Bio</label>
          <textarea id="bio" name="bio" defaultValue={profile?.bio ?? ''} className="ct-input hd-app-textarea" />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={pending} className="ct-btn ct-btn-filled">
            {pending ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            type="button"
            className="ct-btn ct-btn-outline"
            disabled={pending}
            onClick={() => {
              setError(null);
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
