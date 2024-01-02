import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { VIEW_POSTS_CHART, useApi } from '../../../../api'
import { LineChart, TypeLineChart } from '../../../../components/Chart'
import { TIMELINE, TIMELINE_OPTION } from '../../../../constants'

export default function PostView() {
  const [data, setData] = useState<TypeLineChart>({
    labels: [],
    data: []
  })
  const [timeline, setTimeline] = useState<string>(TIMELINE_OPTION._15D)

  useEffect(() => {
    if (timeline) getData()
  }, [timeline])

  const getData = async () => {
    await useApi
      .get(VIEW_POSTS_CHART + `?timeline=${timeline}`)
      .then((res) => {
        const data = res.data as TypeLineChart
        setData(data)
      })
      .catch(() => {})
  }

  return (
    <Box display='flex' alignItems='center' gap={2}>
      <Box flex={1}>
        <LineChart title='Lượt xem bài viết' label='Lượt xem' data={data} />
      </Box>
      <Box>
        {data.data && (
          <>
            <Box sx={{ pb: 2 }}>
              <ButtonGroup orientation='vertical' aria-label='vertical contained button group' variant='text'>
                {Object.keys(TIMELINE_OPTION).map((value) => {
                  return (
                    <Button
                      onClick={() => setTimeline(TIMELINE_OPTION[value])}
                      key={value}
                      sx={{
                        color: TIMELINE_OPTION[value] == timeline ? 'red' : 'blue'
                      }}
                    >
                      {TIMELINE[TIMELINE_OPTION[value]]?.title}
                    </Button>
                  )
                })}
              </ButtonGroup>
            </Box>
            <Typography variant='body2' whiteSpace='nowrap'>
              Tổng lượt xem: {data.data.reduce((pre, value) => pre + value, 0)}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
