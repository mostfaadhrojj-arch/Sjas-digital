import { useEffect, useState } from 'react'

// Small helper so portal pages can do:
//   const { data: students, loading } = useAsyncData(getStudents, [])
// without repeating the same effect/state boilerplate everywhere.
export function useAsyncData(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    fetcher()
      .then((res) => { if (alive) setData(res) })
      .catch((err) => { if (alive) setError(err) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}
