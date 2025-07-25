import Navbar from '../components/Navbar';
import StoreNavbar from '../components/StoreNavbar';
import Footer from '../components/Footer';
import ruizCoinIcon from '../assets/icons/ReizuCoins.svg';
import useTheme from '../hooks/useTheme';

const ShopRuiz = () => {
    const { theme, isDark } = useTheme();

    const coinPackages = [
        { id: 1, amount: 100, price: 0.99 },
        { id: 2, amount: 500, price: 4.99 },
        { id: 3, amount: 1000, price: 9.99 },
        { id: 4, amount: 5000, price: 49.99 }
    ];

    // Planes de suscripción
    const subscriptionPlans = [
        { id: 1, title: 'PLAN BASICO', price: 0.99, period: 'USD por mes', features: ['Visita el sitio sin anuncios.', 'Apoya a la plataforma.'] },
        { id: 2, title: 'PLAN ESTANDAR', price: 2.99, period: 'USD por mes', features: ['Plan básico.', 'Todos los capítulos desbloqueados (No incluyen capítulos especiales).'] },
        { id: 3, title: 'PLAN PREMIUM', price: 4.99, period: 'USD por mes', features: ['Plan estándar.', 'x1.5 (50%) más en ganancias de Reizu Coins.', 'Una impresión física de la Revista OneShot PLUS cada 3 meses.'] },
        { id: 4, title: 'PLAN REIZULOVER', price: 7.99, period: 'USD por mes', features: ['Plan Premium.', 'Una impresión física de un tomo físico de Reizu Comics a elección.'] }
    ];

    return (
        <>
            <Navbar />
            <StoreNavbar />

            {/* Sección de Reizu Coins */}
            <div className="py-5 text-center" style={{ backgroundColor: isDark ? 'var(--bs-body-bg)' : '#f2f2f2' }}>
                <div className="container">
                    <h2 className="fw-bold mb-3 text-danger">TIENDA DE REIZU COINS</h2>
                    <p className="mb-4">Elige la opción que más se acomode a tus necesidades...</p>

                    <div className="row g-4 justify-content-center"
                    >
                        {coinPackages.map(pkg => (
                            <div key={pkg.id} className="col-6 col-md-3">
                                <div
                                    className="card h-100 border-0 shadow-sm p-3 d-flex flex-column align-items-center"
                                    style={{ borderRadius: '12px', backgroundColor: isDark ? '#343a40' : '#ffffff' }}
                                >
                                    <img
                                        src={ruizCoinIcon}
                                        alt={`${pkg.amount} Reizu Coins`}
                                        width={100}
                                        height={100}
                                        className="mb-3"
                                    />
                                    <h5 className="fw-bold mb-2">{pkg.amount} REIZU COINS</h5>
                                    <button
                                        className="btn btn-danger mt-auto"
                                        style={{ borderRadius: '8px' }}
                                    >
                                        Comprar por {pkg.price} USD + iva
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sección de Suscripción */}
            <div className="py-5 text-center" style={{ backgroundColor: isDark ? 'var(--bs-body-bg)' : '#f2f2f2' }}>
                <div className="container" style={{ maxWidth: '1300px' }}>
                    <h2 className="fw-bold mb-3 text-danger">TAMBIÉN PUEDES SUSCRIBIRTE</h2>
                    <p className="mb-4">y disfrutar de beneficios exclusivos y especiales.</p>
                    <div className="row g-4 justify-content-center">
                        {subscriptionPlans.map(plan => (
                            <div key={plan.id} className="col-6 col-md-3">
                                <div className="card h-100 shadow-sm p-4 text-start d-flex flex-column" style={{ borderRadius: '12px', backgroundColor: isDark ? '#343a40' : '#ffffff' }}>
                                    <h5 className="fw-bold mb-3">{plan.title}</h5>
                                    <div className="mb-3">
                                        <span className="fw-bold" style={{ fontSize: '2rem' }}>{plan.price}</span>
                                        <small className="ms-1 text-muted">{plan.period}</small>
                                    </div>
                                    <ul className="list-unstyled mb-4" style={{ fontSize: '0.9rem' }}>
                                        {plan.features.map((f, i) => <li key={i} className="mb-2">• {f}</li>)}
                                    </ul>
                                    <button className="btn btn-danger w-100 mt-auto">ELEGIR</button>
                                </div>
                            </div> // subscription card
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ShopRuiz;
