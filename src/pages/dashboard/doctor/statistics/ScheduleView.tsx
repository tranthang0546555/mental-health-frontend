import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { VIEW_SCHEDULES_CHART, useApi } from '../../../../api'
import { LineChart, TypeLineChart } from '../../../../components/Chart'
import { TIMELINE, TIMELINE_OPTION } from '../../../../constants'

export default function ScheduleView() {
  const [data, setData] = useState<TypeLineChart>({
    labels: [],
    data: []
  })
  const [timeline, setTimeline] = useState<string>(TIMELINE_OPTION._15D)

  useEffect(() => {
    timeline && getData()
  }, [timeline])

  const getData = async () => {
    await useApi
      .get(VIEW_SCHEDULES_CHART + `?timeline=${timeline}`)
      .then((res) => {
        const data = res.data as TypeLineChart
        setData(data)
      })
      .catch(() => {})
  }

  return (
    <Box display='flex' alignItems='center' gap={2}>
      <Box flex={1}>
        <LineChart title='Đăng ký khám' label='Số người' data={data} borderColor='orange' backgroundColor='orange' />
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
              Tổng lượt khám: {data.data.reduce((pre, value) => pre + value, 0)}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
