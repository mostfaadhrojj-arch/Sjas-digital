import React, { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'

const AuthContext = createContext(null)

export const ROLES = ['public', 'admin', 'teacher', 'student', 'parent']

// This demo drives the visible portal purely off `role` so the sales demo
// can jump between views instantly. In production, swap `setRole` calls
// for real Supabase Auth (supabase.auth.signInWithPassword, etc.) and
// derive `role` from the signed-in user's profile row instead.
export function AuthProvider({ children }) {
  const [role, setRole] = useState('public')
  const [user, setUser] = useState(null)

  const signIn = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) {
      console.info('[auth] Supabase not configured — demo mode only.')
      return { error: null }
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) setUser(data.user)
    return { data, error }
  }, [])

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    setUser(null)
    setRole('public')
  }, [])

  const value = useMemo(() => ({ role, setRole, user, signIn, signOut }), [role, user, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
