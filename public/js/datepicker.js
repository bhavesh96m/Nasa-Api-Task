const options = {
    startDate: new Date("1995-06-16".replace(/-/g, '\/')),
    endDate: new Date(),
    inline: true,
    format: 'yyyy-mm-dd',
    autoHide: true
}

$('[data-toggle="datepicker"]').datepicker(options);
