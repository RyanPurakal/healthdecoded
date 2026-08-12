'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { BadgeCriteriaType } from '@/types/database';

const CRITERIA_TYPES: BadgeCriteriaType[] = ['xp_threshold', 'activity_count'];

function parseCriteria(value: FormDataEntryValue | null): BadgeCriteriaType {
  const v = String(value ?? '');
  return (CRITERIA_TYPES as string[]).includes(v) ? (v as BadgeCriteriaType) : 'xp_threshold';
}

export type BadgeFormState = { error?: string } | null;

function readForm(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const icon = String(formData.get('icon') ?? '').trim();
  const criteriaType = parseCriteria(formData.get('criteria_type'));
  const valueRaw = Number(formData.get('criteria_value'));
  const criteriaValue = Number.isFinite(valueRaw) && valueRaw >= 0 ? Math.floor(valueRaw) : 0;
  return { name, description, icon, criteriaType, criteriaValue };
}

export async function createBadge(_prev: BadgeFormState, formData: FormData): Promise<BadgeFormState> {
  const supabase = await createClient();
  const { name, description, icon, criteriaType, criteriaValue } = readForm(formData);

  if (!name) {
    return { error: 'Name is required.' };
  }

  const { error } = await supabase.from('badges').insert({
    name,
    description: description || null,
    icon: icon || null,
    criteria_type: criteriaType,
    criteria_value: criteriaValue,
  });

  if (error) {
    return { error: 'Could not create the badge. Please try again.' };
  }

  revalidatePath('/admin/badges');
  redirect('/admin/badges');
}

export async function updateBadge(
  badgeId: string,
  _prev: BadgeFormState,
  formData: FormData
): Promise<BadgeFormState> {
  const supabase = await createClient();
  const { name, description, icon, criteriaType, criteriaValue } = readForm(formData);

  if (!name) {
    return { error: 'Name is required.' };
  }

  const { error } = await supabase
    .from('badges')
    .update({
      name,
      description: description || null,
      icon: icon || null,
      criteria_type: criteriaType,
      criteria_value: criteriaValue,
    })
    .eq('id', badgeId);

  if (error) {
    return { error: 'Could not save changes. Please try again.' };
  }

  revalidatePath('/admin/badges');
  redirect('/admin/badges');
}

export async function deleteBadge(badgeId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('badges').delete().eq('id', badgeId);

  if (error) {
    return { error: 'Could not delete the badge.' };
  }

  revalidatePath('/admin/badges');
  return {};
}
